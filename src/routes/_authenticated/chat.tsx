import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Bot, Send, Sparkles, User as UserIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({ meta: [{ title: "AI Counsellor — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Give me a 12-week roadmap to become a Full-Stack Engineer.",
  "Compare product management vs software engineering for a CSE fresher.",
  "How do I prepare for Google SDE Intern interviews in 8 weeks?",
  "What's a realistic salary expectation for a Tier-2 college CSE grad?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streaming]);
  useEffect(() => { taRef.current?.focus(); }, []);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content: q }, { role: "assistant", content: "" }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(0, -1) }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `AI error (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = prev.slice();
          copy[copy.length - 1] = { role: "assistant", content: (copy[copy.length - 1]?.content || "") + chunk };
          return copy;
        });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat failed");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setStreaming(false);
      taRef.current?.focus();
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-card"><Bot className="h-5 w-5" /></div>
        <div>
          <h1 className="font-display text-xl font-semibold">AI Career Counsellor</h1>
          <p className="text-xs text-muted-foreground">Roadmaps · salary · college · interview · switch advice</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
        {messages.length === 0 ? (
          <div className="grid h-full place-items-center">
            <div className="max-w-lg text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-card glow-brand"><Sparkles className="h-6 w-6" /></div>
              <h2 className="mt-4 font-display text-2xl font-semibold">What's on your mind?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Ask about roadmaps, resume tips, mock interviews, or which company to target.</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-xl border border-border bg-background/40 p-3 text-left text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${m.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-gradient-brand text-white"}`}>
                  {m.role === "user" ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-background/70 border border-border"}`}>
                  {m.content || (streaming && i === messages.length - 1 ? <span className="inline-flex items-center gap-1 text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Thinking…</span> : "")}
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-3 flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur"
      >
        <Textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder="Ask CareerPilot anything…"
          rows={1}
          className="min-h-[44px] resize-none border-0 bg-transparent focus-visible:ring-0"
        />
        <Button type="submit" disabled={streaming || !input.trim()} className="bg-gradient-brand text-white">
          {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
