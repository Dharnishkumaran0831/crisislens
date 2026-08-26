import { createFileRoute } from "@tanstack/react-router";
import { fetchWithAiFallback } from "@/lib/ai-gateway.server";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { system?: string; messages?: Msg[]; stream?: boolean };
        try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }

        const history = Array.isArray(body.messages) ? body.messages : [];
        const messages: Msg[] = body.system
          ? [{ role: "system", content: body.system }, ...history]
          : history;
        const stream = body.stream !== false;

        let upstream: Response;
        try {
          upstream = await fetchWithAiFallback({ messages, stream });
        } catch (e: any) {
          if (e instanceof Response) return e;
          return new Response(e?.message || "AI Gateway error", { status: 500 });
        }

        if (!upstream.ok) return upstream;

        if (!stream) {
          const json = await upstream.json();
          const text: string =
            json?.choices?.[0]?.message?.content ??
            json?.candidates?.[0]?.content?.parts?.[0]?.text ??
            "";
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
                    const delta: string | undefined =
                      j?.choices?.[0]?.delta?.content ??
                      j?.candidates?.[0]?.content?.parts?.[0]?.text;
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
