import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileText, Download, Sparkles, Loader2, Wand2, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/resume")({
  head: () => ({ meta: [{ title: "Resume Builder — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: ResumePage,
});

type Exp = { role: string; company: string; period: string; bullets: string };
type Edu = { degree: string; school: string; period: string; score: string };
type Resume = {
  name: string; title: string; email: string; phone: string; location: string; links: string;
  summary: string; skills: string;
  experience: Exp[]; education: Edu[]; projects: Exp[];
};

const BLANK: Resume = {
  name: "Ananya Sharma", title: "Software Engineer", email: "ananya@example.com",
  phone: "+91 90000 00000", location: "Bengaluru, India",
  links: "github.com/ananya · linkedin.com/in/ananya",
  summary: "CS undergrad with 200+ DSA problems solved, full-stack projects in React & Node, and internship experience at an early-stage startup. Looking for SDE-1 roles.",
  skills: "TypeScript, React, Node.js, PostgreSQL, Python, AWS, Docker, System Design",
  experience: [
    { role: "SWE Intern", company: "Acme Corp", period: "May 2025 – Aug 2025",
      bullets: "Built realtime dashboard cutting ops time 40%.\nMigrated legacy API to tRPC, improved p95 by 220ms.\nShipped Stripe billing to 1.2k customers." },
  ],
  education: [
    { degree: "B.Tech Computer Science", school: "NIT Trichy", period: "2022 – 2026", score: "CGPA 8.7/10" },
  ],
  projects: [
    { role: "CareerPilot AI", company: "Personal", period: "2026",
      bullets: "AI career platform: streaming chat, resume ATS scorer, mock interviews.\nStack: TanStack Start, Supabase, Gemini." },
  ],
};

function ResumePage() {
  const [r, setR] = useState<Resume>(BLANK);
  const [template, setTemplate] = useState<"classic" | "modern" | "compact">("modern");
  const [analysis, setAnalysis] = useState<{ score: number; text: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [jd, setJd] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const score = useMemo(() => computeAtsScore(r), [r]);

  const download = () => {
    const html = printRef.current?.outerHTML ?? "";
    const w = window.open("", "_blank");
    if (!w) return toast.error("Pop-up blocked");
    w.document.write(`<!doctype html><html><head><title>${r.name} — Resume</title>
      <style>
        *{box-sizing:border-box} body{font-family:Georgia,serif;color:#111;margin:0;padding:32px;background:#fff}
        h1,h2,h3{margin:0}
        .r{max-width:800px;margin:0 auto}
        .modern h1{font-family:'Helvetica',sans-serif;font-size:28px}
        .modern .band{background:linear-gradient(90deg,#6366F1,#8B5CF6,#06B6D4);height:6px;border-radius:3px;margin:12px 0 18px}
        .compact{font-size:12px}
        .row{display:flex;justify-content:space-between;gap:12px}
        .muted{color:#555}
        .sec{margin-top:16px}
        .sec h2{font-size:13px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid #ccc;padding-bottom:4px;margin-bottom:8px}
        ul{margin:4px 0 0 18px;padding:0}
        li{margin:2px 0}
      </style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  const analyze = async () => {
    setAnalyzing(true); setAnalysis(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: false,
          system: "You are an expert ATS resume reviewer for Indian tech placements. Reply with STRICT JSON: {\"score\":0-100,\"strengths\":[\"...\"],\"issues\":[\"...\"],\"rewrites\":[\"...\"],\"missing_keywords\":[\"...\"]}. No prose outside JSON.",
          messages: [{
            role: "user",
            content: `Resume JSON:\n${JSON.stringify(r)}\n\nTarget JD:\n${jd || "General SDE role at a top product company"}`
          }],
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      const clean = text.replace(/```json|```/g, "").trim();
      let parsed: { score?: number; strengths?: string[]; issues?: string[]; rewrites?: string[]; missing_keywords?: string[] } = {};
      try { parsed = JSON.parse(clean); } catch { parsed = { score: score }; }
      const pretty = [
        `**ATS Score: ${parsed.score ?? score}/100**`,
        "",
        parsed.strengths?.length ? `✅ Strengths\n- ${parsed.strengths.join("\n- ")}` : "",
        parsed.issues?.length ? `\n⚠️ Issues\n- ${parsed.issues.join("\n- ")}` : "",
        parsed.rewrites?.length ? `\n✍️ Suggested rewrites\n- ${parsed.rewrites.join("\n- ")}` : "",
        parsed.missing_keywords?.length ? `\n🔑 Missing keywords\n- ${parsed.missing_keywords.join(", ")}` : "",
      ].filter(Boolean).join("\n");
      setAnalysis({ score: parsed.score ?? score, text: pretty });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analysis failed");
    } finally { setAnalyzing(false); }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Resume Builder</h1>
          <p className="text-sm text-muted-foreground">Craft an ATS-optimized resume. Live preview · multiple templates · PDF export.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-sm">
            ATS <span className="ml-1 font-display text-lg font-bold text-gradient-brand">{score}</span>/100
          </div>
          <Button onClick={download} className="bg-gradient-brand text-white"><Download className="mr-2 h-4 w-4" /> PDF</Button>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4">
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="analyze">AI Analyze</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Section title="Basics">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full name" v={r.name} on={(v) => setR({ ...r, name: v })} />
                  <Field label="Headline" v={r.title} on={(v) => setR({ ...r, title: v })} />
                  <Field label="Email" v={r.email} on={(v) => setR({ ...r, email: v })} />
                  <Field label="Phone" v={r.phone} on={(v) => setR({ ...r, phone: v })} />
                  <Field label="Location" v={r.location} on={(v) => setR({ ...r, location: v })} />
                  <Field label="Links" v={r.links} on={(v) => setR({ ...r, links: v })} />
                </div>
              </Section>
              <Section title="Summary">
                <Textarea rows={3} value={r.summary} onChange={(e) => setR({ ...r, summary: e.target.value })} />
              </Section>
              <Section title="Skills (comma separated)">
                <Textarea rows={2} value={r.skills} onChange={(e) => setR({ ...r, skills: e.target.value })} />
              </Section>
              <Repeater title="Experience" items={r.experience}
                onAdd={() => setR({ ...r, experience: [...r.experience, { role: "", company: "", period: "", bullets: "" }] })}
                onRemove={(i) => setR({ ...r, experience: r.experience.filter((_, x) => x !== i) })}
                onChange={(i, v) => setR({ ...r, experience: r.experience.map((it, x) => x === i ? v : it) })}
                renderer={ExpEditor} />
              <Repeater title="Projects" items={r.projects}
                onAdd={() => setR({ ...r, projects: [...r.projects, { role: "", company: "", period: "", bullets: "" }] })}
                onRemove={(i) => setR({ ...r, projects: r.projects.filter((_, x) => x !== i) })}
                onChange={(i, v) => setR({ ...r, projects: r.projects.map((it, x) => x === i ? v : it) })}
                renderer={ExpEditor} />
              <Repeater title="Education" items={r.education}
                onAdd={() => setR({ ...r, education: [...r.education, { degree: "", school: "", period: "", score: "" }] })}
                onRemove={(i) => setR({ ...r, education: r.education.filter((_, x) => x !== i) })}
                onChange={(i, v) => setR({ ...r, education: r.education.map((it, x) => x === i ? v : it) })}
                renderer={EduEditor} />
            </TabsContent>

            <TabsContent value="template" className="space-y-3">
              <p className="text-sm text-muted-foreground">Pick a look — preview updates instantly.</p>
              <div className="grid grid-cols-3 gap-3">
                {(["classic", "modern", "compact"] as const).map((t) => (
                  <button key={t} onClick={() => setTemplate(t)}
                    className={`rounded-xl border p-4 text-left transition ${template === t ? "border-primary bg-gradient-brand-soft" : "border-border hover:border-primary/40"}`}>
                    <FileText className="h-5 w-5" />
                    <p className="mt-2 font-medium capitalize">{t}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {t === "classic" ? "Serif, single column" : t === "modern" ? "Bold header, gradient band" : "Dense, one-page"}
                    </p>
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-3">
              <Label>Target job description (optional)</Label>
              <Textarea rows={6} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste a JD for role-specific analysis…" />
              <Button onClick={analyze} disabled={analyzing} className="bg-gradient-brand text-white">
                {analyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Analyze with AI
              </Button>
              {analysis && (
                <div className="rounded-xl border border-border bg-card/60 p-4 text-sm whitespace-pre-wrap">
                  {analysis.text}
                </div>
              )}
              <div className="rounded-xl border border-border bg-card/40 p-4">
                <p className="text-xs uppercase text-muted-foreground">Instant ATS heuristics</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {atsChecks(r).map((c) => (
                    <li key={c.label} className={c.pass ? "text-emerald-400" : "text-amber-400"}>
                      {c.pass ? "✓" : "•"} {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-card overflow-auto max-h-[85vh]">
          <div ref={printRef}><ResumeRender r={r} template={template} /></div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}
function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input value={v} onChange={(e) => on(e.target.value)} className="mt-1" />
    </div>
  );
}
function Repeater<T>({ title, items, onAdd, onRemove, onChange, renderer: R }: {
  title: string; items: T[]; onAdd: () => void; onRemove: (i: number) => void;
  onChange: (i: number, v: T) => void; renderer: React.ComponentType<{ v: T; on: (v: T) => void }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
        <Button size="sm" variant="ghost" onClick={onAdd}><Plus className="mr-1 h-3 w-3" /> Add</Button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-lg border border-border/60 bg-background/40 p-3">
            <R v={it} on={(v) => onChange(i, v)} />
            <Button size="sm" variant="ghost" onClick={() => onRemove(i)} className="mt-2 text-destructive"><Trash2 className="mr-1 h-3 w-3" /> Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
function ExpEditor({ v, on }: { v: Exp; on: (v: Exp) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <Input placeholder="Role" value={v.role} onChange={(e) => on({ ...v, role: e.target.value })} />
      <Input placeholder="Company" value={v.company} onChange={(e) => on({ ...v, company: e.target.value })} />
      <Input placeholder="Period" value={v.period} onChange={(e) => on({ ...v, period: e.target.value })} />
      <Textarea placeholder="Bullets (one per line)" rows={3} className="sm:col-span-3" value={v.bullets} onChange={(e) => on({ ...v, bullets: e.target.value })} />
    </div>
  );
}
function EduEditor({ v, on }: { v: Edu; on: (v: Edu) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Input placeholder="Degree" value={v.degree} onChange={(e) => on({ ...v, degree: e.target.value })} />
      <Input placeholder="School" value={v.school} onChange={(e) => on({ ...v, school: e.target.value })} />
      <Input placeholder="Period" value={v.period} onChange={(e) => on({ ...v, period: e.target.value })} />
      <Input placeholder="Score / CGPA" value={v.score} onChange={(e) => on({ ...v, score: e.target.value })} />
    </div>
  );
}

function ResumeRender({ r, template }: { r: Resume; template: "classic" | "modern" | "compact" }) {
  return (
    <div className={`r ${template}`} style={{ color: "#111" }}>
      <div>
        <h1 style={{ fontSize: template === "compact" ? 20 : 26 }}>{r.name}</h1>
        <p className="muted" style={{ color: "#555" }}>{r.title}</p>
        {template === "modern" && <div className="band" style={{ background: "linear-gradient(90deg,#6366F1,#8B5CF6,#06B6D4)", height: 6, borderRadius: 3, margin: "12px 0 18px" }} />}
        <p style={{ fontSize: 12, color: "#333" }}>{r.email} · {r.phone} · {r.location} · {r.links}</p>
      </div>
      <Sec title="Summary">{r.summary}</Sec>
      <Sec title="Skills">{r.skills}</Sec>
      <Sec title="Experience">
        {r.experience.map((e, i) => (
          <div key={i} style={{ marginTop: 8 }}>
            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{e.role} · <span style={{ fontWeight: 400 }}>{e.company}</span></strong>
              <span style={{ color: "#555" }}>{e.period}</span>
            </div>
            <ul>{e.bullets.split("\n").filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
          </div>
        ))}
      </Sec>
      <Sec title="Projects">
        {r.projects.map((e, i) => (
          <div key={i} style={{ marginTop: 8 }}>
            <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{e.role} <span style={{ fontWeight: 400, color: "#555" }}>· {e.company}</span></strong>
              <span style={{ color: "#555" }}>{e.period}</span>
            </div>
            <ul>{e.bullets.split("\n").filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
          </div>
        ))}
      </Sec>
      <Sec title="Education">
        {r.education.map((e, i) => (
          <div key={i} className="row" style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span><strong>{e.degree}</strong> · {e.school} — {e.score}</span>
            <span style={{ color: "#555" }}>{e.period}</span>
          </div>
        ))}
      </Sec>
    </div>
  );
}
function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sec" style={{ marginTop: 16 }}>
      <h2 style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", borderBottom: "1px solid #ccc", paddingBottom: 4, marginBottom: 8 }}>{title}</h2>
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function computeAtsScore(r: Resume) {
  let s = 40;
  if (r.summary.length > 80) s += 10;
  if (r.skills.split(",").length >= 6) s += 12;
  if (r.experience.length >= 1) s += 12;
  if (r.projects.length >= 1) s += 10;
  if (r.education.length >= 1) s += 6;
  if (/\d/.test(r.experience.map((e) => e.bullets).join(" "))) s += 6;
  if (r.links.match(/github|linkedin/i)) s += 4;
  return Math.min(100, s);
}
function atsChecks(r: Resume) {
  return [
    { label: "Summary present & 60+ chars", pass: r.summary.length >= 60 },
    { label: "≥ 6 hard skills listed", pass: r.skills.split(",").length >= 6 },
    { label: "Quantified impact in experience (numbers, %)", pass: /\d/.test(r.experience.map((e) => e.bullets).join(" ")) },
    { label: "GitHub or LinkedIn link", pass: /github|linkedin/i.test(r.links) },
    { label: "≥ 1 project listed", pass: r.projects.length >= 1 },
  ];
}
