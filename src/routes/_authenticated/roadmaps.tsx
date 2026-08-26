import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2, Sparkles, Map as MapIcon, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/roadmaps")({
  head: () => ({ meta: [{ title: "Roadmaps — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: RoadmapsPage,
});

type Resource = { title: string; url: string };
type Step = { week: number; title: string; goals: string[]; resources: Resource[]; project: string };
type Roadmap = { goal: string; weeks: number; steps: Step[] };

const PRESETS = ["Full-Stack Engineer", "AI/ML Engineer", "DevOps Engineer", "Data Scientist", "Product Manager", "Frontend Specialist"];

const SAMPLE: Roadmap = {
  goal: "Full-Stack Engineer",
  weeks: 12,
  steps: [
    { week: 1, title: "Modern JavaScript + TypeScript", goals: ["ES2023 features", "TS generics & narrowing", "async patterns"],
      resources: [{ title: "TS Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }], project: "Rebuild a JS project in strict TS" },
    { week: 2, title: "React 18 fundamentals", goals: ["Hooks", "Suspense", "context vs state libs"],
      resources: [{ title: "React docs", url: "https://react.dev" }], project: "Kanban board with optimistic UI" },
    { week: 3, title: "Tailwind + component libraries", goals: ["design tokens", "responsive", "accessibility"],
      resources: [{ title: "shadcn/ui", url: "https://ui.shadcn.com" }], project: "SaaS landing page" },
    { week: 4, title: "REST & tRPC APIs", goals: ["auth", "validation", "pagination"],
      resources: [{ title: "tRPC docs", url: "https://trpc.io" }], project: "Notes API + client" },
  ],
};

function RoadmapsPage() {
  const [goal, setGoal] = useState("Full-Stack Engineer");
  const [weeks, setWeeks] = useState(12);
  const [loading, setLoading] = useState(false);
  const [rm, setRm] = useState<Roadmap>(SAMPLE);
  const [done, setDone] = useState<Set<string>>(() => new Set());

  const key = `careerpilot-roadmap-progress:${rm.goal}`;
  useMemo(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(new Set(JSON.parse(raw)));
      else setDone(new Set());
    } catch { /* ignore */ }
  }, [key]);

  const toggle = (id: string) => {
    setDone((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      try { localStorage.setItem(key, JSON.stringify([...n])); } catch { /* ignore */ }
      return n;
    });
  };

  const totalGoals = rm.steps.reduce((n, s) => n + s.goals.length, 0);
  const completed = rm.steps.reduce((n, s) => n + s.goals.filter((_, i) => done.has(`${s.week}-${i}`)).length, 0);
  const pct = totalGoals ? Math.round((completed / totalGoals) * 100) : 0;

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: false,
          system: `You generate a strict JSON career roadmap. Reply with ONLY JSON, no prose. Schema:
{"goal":"string","weeks":number,"steps":[{"week":number,"title":"string","goals":["string"],"resources":[{"title":"string","url":"https://..."}],"project":"string"}]}
Produce exactly the number of steps equal to weeks. Resources must be real, well-known links.`,
          messages: [{ role: "user", content: `Create a ${weeks}-week roadmap for becoming a ${goal}. Assume the learner is an Indian CSE undergrad targeting placements.` }],
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean) as Roadmap;
      if (!parsed?.steps?.length) throw new Error("Empty roadmap");
      setRm(parsed);
      setDone(new Set());
      toast.success("Roadmap generated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">AI Career Roadmaps</h1>
          <p className="text-sm text-muted-foreground">Personalized timelines with resources, projects and progress tracking.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-card/40 p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_120px_auto]">
          <div>
            <Label className="text-xs">Career goal</Label>
            <Input value={goal} onChange={(e) => setGoal(e.target.value)} list="preset-goals" />
            <datalist id="preset-goals">{PRESETS.map((p) => <option key={p} value={p} />)}</datalist>
          </div>
          <div>
            <Label className="text-xs">Weeks</Label>
            <Input type="number" min={4} max={24} value={weeks} onChange={(e) => setWeeks(Math.max(4, Math.min(24, +e.target.value || 12)))} />
          </div>
          <Button className="self-end bg-gradient-brand text-white" onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} Generate
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p} onClick={() => setGoal(p)} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground">{p}</button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-gradient-brand-soft p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white"><MapIcon className="h-5 w-5" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Current roadmap</p>
              <h2 className="font-display text-xl font-semibold">{rm.goal} · {rm.weeks} weeks</h2>
            </div>
          </div>
          <div className="min-w-[220px]">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>Progress</span><span>{pct}%</span></div>
            <Progress value={pct} />
          </div>
        </div>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400" />
        <div className="space-y-4">
          {rm.steps.map((s) => {
            const stepDone = s.goals.filter((_, i) => done.has(`${s.week}-${i}`)).length;
            const stepPct = Math.round((stepDone / Math.max(1, s.goals.length)) * 100);
            return (
              <motion.div key={s.week} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                <div className="absolute -left-6 top-6 grid h-4 w-4 place-items-center rounded-full bg-gradient-brand ring-4 ring-background" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cyan">Week {s.week}</p>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  </div>
                  <div className="min-w-[160px]">
                    <Progress value={stepPct} />
                    <p className="mt-1 text-right text-[11px] text-muted-foreground">{stepDone}/{s.goals.length} goals</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs uppercase text-muted-foreground">Goals</p>
                    <ul className="space-y-1.5">
                      {s.goals.map((g, i) => {
                        const id = `${s.week}-${i}`;
                        const isDone = done.has(id);
                        return (
                          <li key={i}>
                            <button onClick={() => toggle(id)} className="flex w-full items-start gap-2 text-left text-sm">
                              {isDone ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan" /> : <Circle className="mt-0.5 h-4 w-4 text-muted-foreground" />}
                              <span className={isDone ? "line-through text-muted-foreground" : ""}>{g}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase text-muted-foreground">Resources</p>
                    <ul className="space-y-1.5">
                      {s.resources.map((r, i) => (
                        <li key={i}>
                          <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                            {r.title} <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs uppercase text-muted-foreground">Signature project</p>
                    <p className="text-sm">{s.project}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
