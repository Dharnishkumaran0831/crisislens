import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bot, FileText, Mic, Map, Code2, Briefcase, Sparkles, ArrowRight,
  Check, Target, TrendingUp, Zap, Users, Github, Twitter, Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { GradientOrb } from "@/components/gradient-orb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerPilot AI — Your AI Career Copilot for Placement Success" },
      {
        name: "description",
        content:
          "The all-in-one AI platform for students: career counselling, resume analyzer, mock interviews, roadmaps, DSA tracker, and placement analytics — from first year to first offer.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Career Counsellor", desc: "Chat with a mentor that knows every domain — from AI to product management. Get roadmaps, salary predictions, and switch advice on demand.", tint: "from-indigo-500/20 to-purple-500/20" },
  { icon: FileText, title: "Resume Analyzer & Builder", desc: "ATS scoring, keyword optimization, LaTeX export, and version history. Land in the shortlist, not the reject pile.", tint: "from-purple-500/20 to-fuchsia-500/20" },
  { icon: Mic, title: "AI Mock Interview", desc: "Voice-first interview simulator with confidence scoring, speech analytics, and a per-question report.", tint: "from-fuchsia-500/20 to-cyan-500/20" },
  { icon: Map, title: "Personalised Roadmaps", desc: "Visual roadmaps for SDE, AI, Data, Cyber, Cloud, DevOps, PM and more — with progress tracking.", tint: "from-cyan-500/20 to-indigo-500/20" },
  { icon: Code2, title: "DSA & Coding Tracker", desc: "Track LeetCode, categorize by topic and company, keep your streak alive, and get AI hints.", tint: "from-indigo-500/20 to-cyan-500/20" },
  { icon: Briefcase, title: "Placement Tracker", desc: "Every application, every OA, every interview — one pipeline with analytics and offer summaries.", tint: "from-purple-500/20 to-indigo-500/20" },
];

const stats = [
  { k: "94%", v: "shortlist rate improvement" },
  { k: "2.3x", v: "faster interview prep" },
  { k: "150+", v: "companies covered" },
  { k: "40+", v: "career roadmaps" },
];

const roadmapSteps = [
  { year: "Year 1", title: "Discover", desc: "Explore domains, take AI aptitude, pick a direction." },
  { year: "Year 2", title: "Build", desc: "DSA foundations, first projects, GitHub habits." },
  { year: "Year 3", title: "Sharpen", desc: "Advanced projects, internships, resume passes." },
  { year: "Year 4", title: "Land", desc: "Mock interviews, applications, and offers." },
];

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#roadmap" className="hover:text-foreground transition">Roadmap</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
          <Button asChild size="sm" className="bg-gradient-brand text-white hover:opacity-90">
            <Link to="/auth">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-grid" />
      <GradientOrb className="h-[500px] w-[500px] -top-40 left-1/2 -translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-28 text-center sm:px-6 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan" />
          Introducing CareerPilot AI — your career copilot
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          From first year to <br className="hidden sm:block" />
          <span className="text-gradient-brand">your first offer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          The AI-powered career, resume, interview, coding and placement platform
          built for students. One dashboard. Every advantage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="bg-gradient-brand text-white hover:opacity-90 shadow-card">
            <Link to="/auth">Start free — no card <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border bg-card/60 backdrop-blur">
            <Link to="/dashboard">See the dashboard</Link>
          </Button>
        </motion.div>

        {/* Preview mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-card/70 p-2 shadow-card glow-brand backdrop-blur-xl">
            <div className="rounded-xl bg-background/70 p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { l: "Career Score", v: "82", c: "from-indigo-500 to-purple-500" },
                  { l: "Resume ATS", v: "91", c: "from-purple-500 to-fuchsia-500" },
                  { l: "Interview Ready", v: "76", c: "from-fuchsia-500 to-cyan-500" },
                  { l: "Placement Prob.", v: "88%", c: "from-cyan-500 to-indigo-500" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg border border-border/60 bg-background/60 p-4 text-left">
                    <p className="text-xs text-muted-foreground">{s.l}</p>
                    <p className={`mt-1 bg-gradient-to-r ${s.c} bg-clip-text text-3xl font-bold text-transparent font-display`}>
                      {s.v}
                    </p>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full w-4/5 bg-gradient-to-r ${s.c}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="col-span-2 rounded-lg border border-border/60 bg-background/60 p-4">
                  <p className="text-xs text-muted-foreground">Coding activity — last 12 weeks</p>
                  <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0,1fr))" }}>
                    {Array.from({ length: 24 * 4 }).map((_, i) => {
                      const intensity = (i * 13 + 7) % 5;
                      const bg = ["bg-muted/40", "bg-indigo-500/30", "bg-indigo-500/60", "bg-purple-500/70", "bg-cyan-400/80"][intensity];
                      return <div key={i} className={`h-3 rounded-sm ${bg}`} />;
                    })}
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/60 p-4">
                  <p className="text-xs text-muted-foreground">Next interview</p>
                  <p className="mt-2 font-display text-lg font-semibold">Google — SDE Intern</p>
                  <p className="text-xs text-muted-foreground">Fri, 10:30 AM</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-cyan/10 px-2 py-0.5 text-xs text-cyan">DSA</span>
                    <span className="rounded-full bg-purple/10 px-2 py-0.5 text-xs text-purple-300">System Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v}>
              <p className="font-display text-3xl font-bold text-gradient-brand">{s.k}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-cyan">Everything you need</p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
            One cockpit for your entire career journey
          </h2>
          <p className="mt-4 text-muted-foreground">
            Stop juggling ten tools. CareerPilot brings career guidance,
            resume, interview, coding, and placement tracking into one AI-native surface.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:border-primary/50 hover:shadow-card"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${f.tint} opacity-0 transition group-hover:opacity-100`} />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-card">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-cyan">Your 4-year flight plan</p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
            AI charts the course, you fly it
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 opacity-50 md:block" />
          <div className="grid gap-8 md:grid-cols-4">
            {roadmapSteps.map((s, i) => (
              <motion.div
                key={s.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-card/70 p-6 backdrop-blur"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                  {s.year}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-brand-soft p-10 backdrop-blur">
          <GradientOrb className="-right-20 -top-20 h-64 w-64" />
          <p className="font-display text-2xl leading-relaxed sm:text-3xl">
            "I went from 'no idea what to do' in second year to a
            <span className="text-gradient-brand"> ₹18 LPA SDE offer </span>
            at graduation. CareerPilot's roadmap and mock interviews were my unfair advantage."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-brand" />
            <div>
              <p className="text-sm font-medium">Ananya Reddy</p>
              <p className="text-xs text-muted-foreground">CSE '25 — placed at a FAANG</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      desc: "Everything you need to get started.",
      features: ["AI Career Chat (limited)", "Resume analyzer", "Coding & placement tracker", "3 roadmaps"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "/mo",
      desc: "Unlock the full AI copilot experience.",
      features: ["Unlimited AI chat + memory", "Voice mock interviews", "All 40+ roadmaps", "AI cover letters + portfolio", "Placement analytics", "Priority support"],
      cta: "Go Pro",
      highlight: true,
    },
  ];
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-cyan">Simple pricing</p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">Start free. Upgrade when it matters.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 backdrop-blur ${
                p.highlight ? "border-primary/50 bg-card/80 glow-brand" : "border-border bg-card/60"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-0.5 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${p.highlight ? "bg-gradient-brand text-white hover:opacity-90" : ""}`}
                variant={p.highlight ? "default" : "outline"}
              >
                <Link to="/auth">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-brand p-12 text-center text-white shadow-card glow-brand">
          <GradientOrb className="-right-20 -bottom-20 h-80 w-80 opacity-30" />
          <h2 className="font-display text-4xl font-bold tracking-tight">Fly higher, sooner.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Join thousands of students using CareerPilot AI to land the internships and offers they actually want.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 bg-white text-primary hover:bg-white/90">
            <Link to="/auth">Create your free account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} CareerPilot AI</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Roadmap />
        <Testimonial />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
