import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Bot, Mic, MicOff, Send, Loader2, Volume2, VolumeX, RefreshCw, Award } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/interview")({
  head: () => ({ meta: [{ title: "Mock Interview — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: InterviewPage,
});

type Mode = "hr" | "technical" | "voice";
type Msg = { role: "user" | "assistant"; content: string };

const PROMPTS: Record<Mode, string> = {
  hr: "You are a friendly but rigorous HR interviewer at a top Indian tech company. Ask ONE behavioral question at a time (STAR-friendly). Wait for the candidate's answer, then give a brief 1-line acknowledgement and ask the next question. After 6 questions say 'INTERVIEW_COMPLETE' on its own line.",
  technical: "You are a senior SDE technical interviewer. Ask ONE question at a time — mix DSA, system design, and language fundamentals suited for SDE-1. Probe with follow-ups when answers are vague. After 6 questions say 'INTERVIEW_COMPLETE' on its own line.",
  voice: "You are conducting a spoken interview. Ask ONE concise question at a time (max 2 sentences). Keep responses short and natural for text-to-speech. After 5 questions say 'INTERVIEW_COMPLETE' on its own line.",
};

const OPENERS: Record<Mode, string> = {
  hr: "Welcome! Let's start with a classic: tell me about yourself in 60 seconds.",
  technical: "Great, let's begin. Explain the difference between an array and a linked list, and when you would choose one over the other.",
  voice: "Hi! Ready when you are. First question: what's a project you're most proud of and why?",
};

function InterviewPage() {
  const [mode, setMode] = useState<Mode>("hr");
  const [role, setRole] = useState("SDE-1");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [ttsOn, setTtsOn] = useState(true);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const speak = (text: string) => {
    if (!ttsOn || mode !== "voice" || typeof window === "undefined") return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1; u.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch { /* ignore */ }
  };

  const start = () => {
    setDone(false); setReport(null);
    const opener = `You're interviewing for ${role}. ${OPENERS[mode]}`;
    setMessages([{ role: "assistant", content: opener }]);
    speak(opener);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy || done) return;
    const next: Msg[] = [...messages, { role: "user", content: q }, { role: "assistant", content: "" }];
    setMessages(next); setInput(""); setBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: `${PROMPTS[mode]} Target role: ${role}.`,
          messages: next.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text().catch(() => "AI error"));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done: d } = await reader.read();
        if (d) break;
        const chunk = dec.decode(value, { stream: true });
        acc += chunk;
        setMessages((prev) => {
          const c = prev.slice();
          c[c.length - 1] = { role: "assistant", content: acc };
          return c;
        });
      }
      if (acc.includes("INTERVIEW_COMPLETE")) {
        const clean = acc.replace(/INTERVIEW_COMPLETE/g, "").trim();
        setMessages((prev) => { const c = prev.slice(); c[c.length - 1] = { role: "assistant", content: clean || "Thanks — that concludes the interview." }; return c; });
        setDone(true);
        speak("Thanks. That concludes the interview. Generating your report now.");
        void generateReport(next);
      } else {
        speak(acc);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Interview error");
      setMessages((prev) => prev.slice(0, -1));
    } finally { setBusy(false); }
  };

  const generateReport = async (msgs: Msg[]) => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: false,
          system: "You are an expert interview coach. Given a transcript, produce a structured report in markdown with sections: Overall score (0-100), Communication (0-10), Technical depth (0-10), Confidence (0-10), Structure (0-10), Top 3 strengths, Top 3 improvements, One recommended drill for the next 48 hours. Be specific and cite the candidate's own answers.",
          messages: [{ role: "user", content: `Role: ${role}\nMode: ${mode}\n\nTranscript:\n${msgs.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}` }],
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setReport(text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Report failed");
    }
  };

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return toast.error("Speech recognition not supported in this browser");
    if (listening) { recogRef.current?.stop(); setListening(false); return; }
    const r = new SR();
    r.lang = "en-US"; r.interimResults = true; r.continuous = false;
    let finalT = "";
    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t;
        else interim += t;
      }
      setInput((finalT + interim).trim());
    };
    r.onend = () => { setListening(false); };
    r.onerror = () => setListening(false);
    recogRef.current = r;
    r.start();
    setListening(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">AI Mock Interview</h1>
          <p className="text-sm text-muted-foreground">HR · Technical · Voice — realtime feedback and a detailed report.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["SDE-1", "Frontend Engineer", "Backend Engineer", "Data Scientist", "Product Manager", "DevOps Engineer"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={() => setTtsOn((x) => !x)} aria-label="Toggle voice">
            {ttsOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <Tabs value={mode} onValueChange={(v) => { setMode(v as Mode); setMessages([]); setDone(false); setReport(null); }}>
        <TabsList>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
        </TabsList>
        {(["hr", "technical", "voice"] as Mode[]).map((m) => (
          <TabsContent key={m} value={m}>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-border bg-card/40 p-4 min-h-[420px] flex flex-col">
                {messages.length === 0 ? (
                  <div className="grid flex-1 place-items-center text-center">
                    <div>
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white glow-brand"><Bot className="h-6 w-6" /></div>
                      <h3 className="mt-3 font-display text-xl font-semibold">Ready when you are</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Realistic {m === "hr" ? "HR" : m === "technical" ? "technical" : "voice"} round for {role}. 5–6 questions with a full report at the end.</p>
                      <Button className="mt-4 bg-gradient-brand text-white" onClick={start}>Start interview</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`grid h-7 w-7 flex-none place-items-center rounded-lg ${msg.role === "user" ? "bg-secondary" : "bg-gradient-brand text-white"}`}>
                          {msg.role === "user" ? "You" : <Bot className="h-3 w-3" />}
                        </div>
                        <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-secondary" : "border border-border bg-background/70"}`}>
                          {msg.content || <Loader2 className="h-3 w-3 animate-spin" />}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}

                {messages.length > 0 && !done && (
                  <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex items-end gap-2">
                    <Textarea rows={2} value={input} onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                      placeholder={m === "voice" ? "Speak or type…" : "Your answer…"} />
                    {m === "voice" && (
                      <Button type="button" variant={listening ? "destructive" : "outline"} size="icon" onClick={toggleMic}>
                        {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    )}
                    <Button type="submit" disabled={busy || !input.trim()} className="bg-gradient-brand text-white">
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                )}
                {done && (
                  <Button variant="outline" className="mt-3" onClick={() => { setMessages([]); setDone(false); setReport(null); }}>
                    <RefreshCw className="mr-2 h-4 w-4" /> New session
                  </Button>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card/40 p-4">
                <div className="flex items-center gap-2"><Award className="h-4 w-4 text-cyan" /><h3 className="font-display text-lg font-semibold">Interview report</h3></div>
                <p className="text-xs text-muted-foreground">Generated after the session completes.</p>
                <div className="mt-3 whitespace-pre-wrap text-sm">
                  {done && !report && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Scoring your answers…</div>}
                  {report ? report : (!done ? <p className="text-muted-foreground">Complete the interview to see your score, feedback and next drill.</p> : null)}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
