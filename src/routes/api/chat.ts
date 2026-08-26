import { createFileRoute } from "@tanstack/react-router";
import { SYSTEM_PROMPT, fetchWithAiFallback } from "@/lib/ai-gateway.server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[] };
        try { body = (await request.json()) as { messages?: ChatMessage[] }; }
        catch { return new Response("Invalid JSON", { status: 400 }); }

        const history = Array.isArray(body.messages) ? body.messages : [];
        const messages: ChatMessage[] = [{ role: "system", content: SYSTEM_PROMPT }, ...history];

        let upstream: Response;
        try {
          upstream = await fetchWithAiFallback({ messages, stream: true });
        } catch (e: any) {
          if (e instanceof Response) return e;
          return new Response(e?.message || "AI Gateway error", { status: 500 });
        }

        if (!upstream.ok || !upstream.body) {
          return upstream;
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
