import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Target, Activity, Award } from "lucide-react";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({ meta: [{ title: "Analytics — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: AnalyticsPage,
});

const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#22c55e", "#f59e0b", "#ef4444"];

function AnalyticsPage() {
  const cp = useQuery({
    queryKey: ["an-cp"],
    queryFn: async () => (await supabase.from("coding_problems").select("id,status,difficulty,topic,solved_at,created_at").limit(1000)).data ?? [],
  });
  const apps = useQuery({
    queryKey: ["an-apps"],
    queryFn: async () => (await supabase.from("applications").select("id,status,company,role,salary_lpa,applied_at").limit(500)).data ?? [],
  });

  const problems = cp.data ?? [];
  const applications = apps.data ?? [];

  const solved = problems.filter((p) => p.status === "solved").length;
  const easy = problems.filter((p) => p.difficulty === "Easy" && p.status === "solved").length;
  const med = problems.filter((p) => p.difficulty === "Medium" && p.status === "solved").length;
  const hard = problems.filter((p) => p.difficulty === "Hard" && p.status === "solved").length;

  // Placement probability heuristic
  const interviews = applications.filter((a) => ["interview", "oa", "selected", "offer"].includes(a.status)).length;
  const offers = applications.filter((a) => a.status === "offer" || a.status === "selected").length;
  const probability = Math.min(98, Math.round(30 + solved * 0.4 + interviews * 6 + offers * 15 + (med + hard * 2) * 0.5));

  const topicCounts = new Map<string, number>();
  problems.forEach((p) => topicCounts.set(p.topic, (topicCounts.get(p.topic) ?? 0) + (p.status === "solved" ? 1 : 0)));
  const topicData = Array.from(topicCounts.entries()).map(([topic, count]) => ({ topic, count })).slice(0, 8);

  const stageData = ["applied", "oa", "interview", "selected", "offer", "rejected"].map((s) => ({
    stage: s.toUpperCase(), count: applications.filter((a) => a.status === s).length,
  }));

  const skillRadar = [
    { skill: "DSA", score: Math.min(100, 30 + solved * 1.5) },
    { skill: "System Design", score: 55 },
    { skill: "Frontend", score: 78 },
    { skill: "Backend", score: 70 },
    { skill: "AI/ML", score: 60 },
    { skill: "Communication", score: 74 },
  ];

  const resumeSeries = Array.from({ length: 10 }).map((_, i) => ({ v: `v${i + 1}`, score: 60 + i * 3 + Math.round(Math.random() * 4) }));
  const interviewSeries = Array.from({ length: 8 }).map((_, i) => ({ s: `S${i + 1}`, score: 55 + i * 4 + Math.round(Math.random() * 6) }));

  const funnelPie = stageData.filter((s) => s.count > 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Placement probability · coding · resume · interviews · skills.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={Target} label="Placement probability" value={`${probability}%`} sub={`Based on ${applications.length} apps · ${solved} solved`} />
        <Kpi icon={TrendingUp} label="Problems solved" value={String(solved)} sub={`E ${easy} · M ${med} · H ${hard}`} />
        <Kpi icon={Activity} label="Active pipelines" value={String(interviews)} sub="OA + interview + selected" />
        <Kpi icon={Award} label="Offers" value={String(offers)} sub={offers > 0 ? "Congrats 🎉" : "Keep going"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Skill radar" desc="Multi-domain readiness">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="#334" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
              <Radar dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Coding by topic" desc="Solved per topic">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topicData}>
              <XAxis dataKey="topic" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1e1e3f", border: "1px solid #334", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="url(#g1)" radius={[6, 6, 0, 0]} />
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Placement funnel" desc="Where your apps land">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={funnelPie.length ? funnelPie : [{ stage: "No data", count: 1 }]} dataKey="count" nameKey="stage" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {(funnelPie.length ? funnelPie : [{ stage: "No data", count: 1 }]).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Resume ATS progress" desc="Score across resume versions">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={resumeSeries}>
              <XAxis dataKey="v" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#1e1e3f", border: "1px solid #334", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Interview analytics" desc="Mock interview scores over sessions">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={interviewSeries}>
              <XAxis dataKey="s" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#1e1e3f", border: "1px solid #334", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold">{value}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white"><Icon className="h-4 w-4" /></div>
      </div>
    </motion.div>
  );
}
function Card({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
