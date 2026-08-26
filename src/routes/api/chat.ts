import { createFileRoute } from "@tanstack/react-router";
import { SYSTEM_PROMPT, getAiConfig } from "@/lib/ai-gateway.server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { key, url, model } = getAiConfig();
        if (!key) return new Response("Missing API key. Please set GEMINI_API_KEY or AI_GATEWAY_API_KEY in environment variables.", { status: 500 });

        let body: { messages?: ChatMessage[] };
        try { body = (await request.json()) as { messages?: ChatMessage[] }; }
        catch { return new Response("Invalid JSON", { status: 400 }); }

        const history = Array.isArray(body.messages) ? body.messages : [];
        const messages: ChatMessage[] = [{ role: "system", content: SYSTEM_PROMPT }, ...history];

        const upstream = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
            "x-goog-api-key": key,
          },
          body: JSON.stringify({
            model,
            messages,
            stream: true,
          }),
        });

        if (!upstream.ok || !upstream.body) {
          if (upstream.status === 401) {
            return new Response("Invalid API Key format. Please set a valid GEMINI_API_KEY in Vercel environment variables (get a free key from https://aistudio.google.com/app/apikey).", { status: 401 });
          }
          if (upstream.status === 429) return new Response("Rate limited. Try again in a moment.", { status: 429 });
          if (upstream.status === 402) return new Response("AI credits exhausted.", { status: 402 });
          const text = await upstream.text().catch(() => "");
          return new Response(text || "AI gateway error", { status: upstream.status });
        }

        // Stream SSE → text chunks for the client.
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const stream = new ReadableStream({
          async start(controller) {
            const reader = upstream.body!.getReader();
            let buf = "";
            try {
              while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split("\n");
                buf = lines.pop() ?? "";
                for (const line of lines) {
                  const l = line.trim();
                  if (!l.startsWith("data:")) continue;
                  const payload = l.slice(5).trim();
                  if (payload === "[DONE]") { controller.close(); return; }
                  try {
                    const json = JSON.parse(payload);
                    const delta: string | undefined = json?.choices?.[0]?.delta?.content;
                    if (delta) controller.enqueue(encoder.encode(delta));
                  } catch { /* ignore keepalives */ }
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
          },
        });
      },
    },
  },
});
