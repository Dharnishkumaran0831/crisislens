import { createFileRoute } from "@tanstack/react-router";
import { getAiConfig } from "@/lib/ai-gateway.server";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { key, url, model } = getAiConfig();
        if (!key) return new Response("Missing API key. Please set GEMINI_API_KEY or AI_GATEWAY_API_KEY in environment variables.", { status: 500 });

        let body: { system?: string; messages?: Msg[]; stream?: boolean };
        try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }

        const history = Array.isArray(body.messages) ? body.messages : [];
        const messages: Msg[] = body.system
          ? [{ role: "system", content: body.system }, ...history]
          : history;
        const stream = body.stream !== false;

        const upstream = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
            "x-goog-api-key": key,
          },
          body: JSON.stringify({ model, messages, stream }),
        });

        if (!upstream.ok) {
          const t = await upstream.text().catch(() => "");
          if (upstream.status === 401) {
            return new Response("Invalid API Key format. Please set a valid GEMINI_API_KEY in Vercel environment variables (get a free key from https://aistudio.google.com/app/apikey).", { status: 401 });
          }
          if (upstream.status === 429) return new Response("Rate limited. Try again shortly.", { status: 429 });
          if (upstream.status === 402) return new Response("AI credits exhausted.", { status: 402 });
          return new Response(t || "AI gateway error", { status: upstream.status });
        }

        if (!stream) {
          const json = await upstream.json();
          const text: string = json?.choices?.[0]?.message?.content ?? "";
          return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const rs = new ReadableStream({
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
                    const j = JSON.parse(payload);
                    const delta: string | undefined = j?.choices?.[0]?.delta?.content;
                    if (delta) controller.enqueue(encoder.encode(delta));
                  } catch { /* ignore */ }
                }
              }
              controller.close();
            } catch (e) { controller.error(e); }
          },
        });
        return new Response(rs, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
      },
    },
  },
});
