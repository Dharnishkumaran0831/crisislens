import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area,
} from "recharts";
import {
  TrendingUp, Award, Zap, Target, Sparkles, ArrowUpRight, Flame, Calendar as Cal, Bot,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const skillRadar = [
  { skill: "DSA", score: 78 },
  { skill: "System Design", score: 55 },
  { skill: "Frontend", score: 82 },
  { skill: "Backend", score: 71 },
  { skill: "AI/ML", score: 64 },
  { skill: "Communication", score: 74 },
];
const trend = Array.from({ length: 12 }).map((_, i) => ({
  w: `W${i + 1}`,
  career: 40 + i * 3 + Math.round(Math.random() * 6),
  interview: 30 + i * 3.5 + Math.round(Math.random() * 6),
}));
const spark = (base: number) =>
  Array.from({ length: 12 }).map((_, i) => ({ i, v: base + Math.round(Math.random() * 15 - 5 + i) }));

function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)); }, []);
  const name = session?.user.user_metadata?.full_name?.split(" ")[0] || "there";

  const appsQuery = useQuery({
    queryKey: ["dash-apps"],
    queryFn: async () => (await supabase.from("applications").select("id,status,company,role,applied_at").order("applied_at", { ascending: false }).limit(5)).data ?? [],
  });
  const cpQuery = useQuery({
    queryKey: ["dash-cp"],
    queryFn: async () => (await supabase.from("coding_problems").select("id,status,difficulty,solved_at,created_at").limit(200)).data ?? [],
  });

  const solved = (cpQuery.data ?? []).filter((p) => p.status === "solved").length;
  const totalApps = appsQuery.data?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-border bg-gradient-brand-soft p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">Hi {name} 👋</h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">You're on a <span className="inline-flex items-center gap-1 text-cyan"><Flame className="h-3 w-3" /> 7-day streak</span>. Two mock interviews scheduled this week — let's stay sharp.</p>
          </div>
          <Button asChild className="bg-gradient-brand text-white"><Link to="/chat"><Sparkles className="mr-2 h-4 w-4" /> Ask AI Counsellor</Link></Button>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Kpi label="AI Career Score" value="82" delta="+6 this week" icon={Target} data={spark(60)} color="#6366F1" />
        <Kpi label="Resume ATS" value="91" delta="+3 vs last edit" icon={Award} data={spark(70)} color="#8B5CF6" />
        <Kpi label="Interview Readiness" value="76" delta="+11 after last mock" icon={TrendingUp} data={spark(50)} color="#a855f7" />
        <Kpi label="Placement Probability" value="88%" delta="Top 12% of cohort" icon={Zap} data={spark(65)} color="#06B6D4" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Growth trajectory</h3>
              <p className="text-xs text-muted-foreground">Weekly Career vs Interview scores</p>
            </div>
            <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">Last 12 weeks</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06B6D4" stopOpacity={0.5} /><stop offset="100%" stopColor="#06B6D4" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="w" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={30} />
                <Tooltip contentStyle={{ background: "#1e1e3f", border: "1px solid #334", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="career" stroke="#8B5CF6" strokeWidth={2} fill="url(#c1)" />
                <Area type="monotone" dataKey="interview" stroke="#06B6D4" strokeWidth={2} fill="url(#c2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
          <h3 className="font-display text-lg font-semibold">Skill radar</h3>
          <p className="text-xs text-muted-foreground">Your strengths across domains</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillRadar}>
                <PolarGrid stroke="#334" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                <PolarRadiusAxis stroke="#334" tick={false} axisLine={false} />
                <Radar dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Coding heatmap + stats */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Coding activity</h3>
              <p className="text-xs text-muted-foreground">Problems attempted — last 12 weeks</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/coding">Open tracker <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </div>
          <Heatmap />
          <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
            <span><span className="font-display text-2xl font-bold text-foreground">{solved}</span> solved</span>
            <span>Longest streak <span className="font-medium text-foreground">14d</span></span>
            <span>Weekly avg <span className="font-medium text-foreground">18</span></span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
          <h3 className="font-display text-lg font-semibold">Upcoming</h3>
          <p className="text-xs text-muted-foreground">Interviews & deadlines</p>
          <ul className="mt-4 space-y-3">
            {[
              { c: "Google", r: "SDE Intern", d: "Fri · 10:30 AM" },
              { c: "Zoho", r: "Software Dev", d: "Mon · 2:00 PM" },
              { c: "TCS NQT", r: "Registration", d: "Wed · 11:59 PM" },
            ].map((e) => (
              <li key={e.c} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-xs font-semibold text-white">{e.c[0]}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.c} — {e.r}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Cal className="h-3 w-3" /> {e.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended + AI CTA */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
          <h3 className="font-display text-lg font-semibold">Recommended jobs</h3>
          <p className="text-xs text-muted-foreground">Matched to your skills and target salary</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { c: "Microsoft", r: "SWE Intern", m: 92, s: "₹1.2L/mo" },
              { c: "Freshworks", r: "Product Engineer", m: 88, s: "₹22 LPA" },
              { c: "Razorpay", r: "Backend Intern", m: 85, s: "₹80k/mo" },
              { c: "Postman", r: "Frontend Engineer", m: 81, s: "₹18 LPA" },
            ].map((j) => (
              <div key={j.c + j.r} className="rounded-xl border border-border/60 bg-background/40 p-4 hover:border-primary/40 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{j.r}</p>
                    <p className="text-xs text-muted-foreground">{j.c} · {j.s}</p>
                  </div>
                  <span className="rounded-full bg-cyan/10 px-2 py-0.5 text-xs font-medium text-cyan">{j.m}% match</span>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-brand" style={{ width: `${j.m}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/chat" className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-brand p-6 text-white shadow-card">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <Bot className="h-8 w-8" />
          <h3 className="mt-4 font-display text-xl font-semibold">Ask your AI Counsellor</h3>
          <p className="mt-2 text-sm text-white/80">Get personal roadmaps, salary predictions, and career advice in seconds.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">Start chatting <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
        </Link>
      </div>

      <div className="text-xs text-muted-foreground">Signed in as {session?.user.email} · {totalApps} recent applications tracked</div>
    </div>
  );
}

function Kpi({ label, value, delta, icon: Icon, data, color }: { label: string; value: string; delta: string; icon: React.ComponentType<{ className?: string }>; data: { i: number; v: number }[]; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold">{value}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-[11px] text-cyan">{delta}</p>
      <div className="mt-3 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} /></LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function Heatmap() {
  const cells = Array.from({ length: 12 * 7 }).map((_, i) => {
    const intensity = Math.max(0, Math.min(4, Math.round(Math.random() * 4 - (i % 7 === 0 ? 1 : 0))));
    return intensity;
  });
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
      {Array.from({ length: 12 }).map((_, col) => (
        <div key={col} className="grid gap-1" style={{ gridTemplateRows: "repeat(7, minmax(0,1fr))" }}>
          {Array.from({ length: 7 }).map((_, row) => {
            const v = cells[col * 7 + row];
            const bg = ["bg-muted/40", "bg-indigo-500/30", "bg-indigo-500/60", "bg-purple-500/70", "bg-cyan-400/80"][v];
            return <div key={row} className={`h-4 w-full rounded-sm ${bg}`} />;
          })}
        </div>
      ))}
    </div>
  );
}
