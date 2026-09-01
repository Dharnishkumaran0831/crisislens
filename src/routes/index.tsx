import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Sun,
  Moon,
  Mail,
  Github,
  Linkedin,
  MapPin,
  ExternalLink,
  FileDown,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Send,
  X,
  Check,
  Award,
  GraduationCap,
  Phone,
  Cpu,
  Trophy,
  Zap,
  BookOpen,
  Filter,
  Eye,
  FileText,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/gradient-orb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dharnishkumaran R — Full-Stack Developer & IT Engineer Portfolio" },
      {
        name: "description",
        content:
          "Official portfolio of Dharnishkumaran R, B.Tech Information Technology student at V.S.B. Engineering College. Specializing in Java, SQL, React, TypeScript, Supabase, AI Platforms, and Process Automation.",
      },
    ],
  }),
  component: Portfolio,
});

// TYPES & DATA DEFINITIONS
interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: "Full-Stack AI" | "Process Automation";
  image: string;
  color: string;
  accent: string;
  tags: string[];
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "careerpilot",
    title: "CareerPilot AI",
    subtitle: "AI-Powered Career & Placement Platform",
    date: "Jul 2026",
    category: "Full-Stack AI",
    image: "/careerpilot_mockup.jpg",
    color: "from-indigo-600 to-purple-600",
    accent: "text-indigo-400",
    tags: ["React 19", "TypeScript", "Supabase", "Vercel", "AI ATS Engine"],
    description:
      "An all-in-one AI career ecosystem designed to empower students with intelligent resume ATS scoring, interactive mock interviews, and tailored career roadmaps.",
    problem:
      "Students often lack structured career guidance, struggle to pass automated resume ATS screening algorithms, and lack real-time feedback during mock technical interviews.",
    solution:
      "Engineered an integrated web application powered by modern React, TypeScript, and Supabase. The system analyzes resumes against real job specifications, simulates dynamic technical mock interviews, and creates personalized skill roadmaps.",
    keyFeatures: [
      "AI Resume ATS Analyzer with real-time feedback & keyword optimization",
      "Interactive AI Mock Interviewer simulating real-world engineering questions",
      "Personalized step-by-step career path & skill roadmap generator",
      "Supabase backend database integration for user profiles & analytical tracking",
      "Production deployment hosted on Vercel platform with lightning-fast speeds"
    ],
    techStack: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://careerpilot-ai.vercel.app",
    githubUrl: "https://github.com/Dharnishkumaran0831"
  },
  {
    id: "policyflow",
    title: "Policy Flow AI",
    subtitle: "Policy Workflow Automation System",
    date: "Dec 2025",
    category: "Process Automation",
    image: "/insurai_mockup.jpg",
    color: "from-purple-600 to-blue-600",
    accent: "text-purple-400",
    tags: ["TypeScript", "Automation Logic", "Process Automation", "Backend Engine"],
    description:
      "Advanced decision-logic architecture designed to streamline, automate, and validate complex corporate policy management workflows.",
    problem:
      "Corporate insurance and enterprise policy approval pipelines suffer from manual paper bottlenecks, inconsistent decision rules, and long operational delays.",
    solution:
      "Architected a robust rule-based automation system using TypeScript and modular process logic. Automated policy condition evaluations, accelerated claim processing, and improved backend constraint handling.",
    keyFeatures: [
      "Automated enterprise policy decision-tree execution engine",
      "Structured policy constraint handling & verification modules",
      "Real-time pipeline monitoring for claim approval workflows",
      "Reduced policy processing latency and operational manual overhead"
    ],
    techStack: ["TypeScript", "Node.js", "Process Automation Logic", "RESTful Architecture"],
    liveUrl: "https://github.com/Dharnishkumaran0831",
    githubUrl: "https://github.com/Dharnishkumaran0831"
  }
];

interface SkillGroup {
  category: string;
  id: string;
  icon: any;
  color: string;
  skills: { name: string; level: number; desc: string }[];
}

const SKILL_CATEGORIES: SkillGroup[] = [
  {
    category: "Languages & Core",
    id: "languages",
    icon: Code2,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    skills: [
      { name: "Java", level: 85, desc: "OOP, Collections Framework, Multithreading, Algorithms" },
      { name: "SQL", level: 82, desc: "PostgreSQL, MySQL, Joins, Indexing & Database Queries" },
      { name: "TypeScript", level: 80, desc: "Static Typing, Interfaces, Generics, Modular Code" },
      { name: "JavaScript (ES6+)", level: 85, desc: "Async/Await, DOM Manipulation, Promises, Modules" }
    ]
  },
  {
    category: "Web Technologies",
    id: "web",
    icon: Globe,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    skills: [
      { name: "React.js", level: 88, desc: "Hooks, Custom Hooks, State Management, Component Lifecycle" },
      { name: "HTML5 & CSS3", level: 92, desc: "Semantic Elements, Flexbox, Grid, Responsive Design" },
      { name: "Supabase", level: 78, desc: "Authentication, Realtime Database, Row Level Security" },
      { name: "Tailwind CSS", level: 90, desc: "Utility-First Styling, Custom Design Systems, Glassmorphism" }
    ]
  },
  {
    category: "Specialized Domains",
    id: "specialized",
    icon: Cpu,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    skills: [
      { name: "Full-Stack Development", level: 82, desc: "Connecting React Frontends with Supabase/Node Backends" },
      { name: "Process Automation", level: 80, desc: "Decision Tree Architectures & Enterprise Policy Workflows" },
      { name: "Scalable Applications", level: 78, desc: "Clean Architecture, Modular Components & Speed Optimization" },
      { name: "AI Integration", level: 80, desc: "Integrating AI APIs for Mock Interviews & Resume ATS Scoring" }
    ]
  }
];

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period: string;
  badge: string;
  credentialId: string;
  color: string;
  iconColor: string;
  desc: string;
  skills: string[];
  pdfUrl: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    id: "insurai-internship",
    title: "Internship 6.0: InsurAI – Corporate Policy Automation System",
    issuer: "Infosys Springboard",
    period: "Jan – Mar 2026",
    badge: "Industrial Internship",
    credentialId: "INF-SB-2026-INSURAI-6.0",
    color: "border-indigo-500/50 bg-indigo-500/10",
    iconColor: "text-indigo-400 bg-indigo-500/20",
    desc: "Hands-on industrial internship developing AI-driven corporate policy automation workflows, policy intelligence rules, and enterprise backend automation constraints.",
    skills: ["Policy Automation", "Backend Logic", "Enterprise Architecture", "AI Integration"],
    pdfUrl: "#"
  },
  {
    id: "nptel-java",
    title: "Programming in Java (National Certification)",
    issuer: "NPTEL",
    period: "Jun 2025",
    badge: "National Certification",
    credentialId: "NPTEL25CS88S1590",
    color: "border-purple-500/50 bg-purple-500/10",
    iconColor: "text-purple-400 bg-purple-500/20",
    desc: "Rigorous national examination testing core Java object-oriented principles, multithreading, collection data structures, and algorithmic problem-solving.",
    skills: ["Core Java", "OOP Principles", "Multithreading", "Data Structures"],
    pdfUrl: "#"
  },
  {
    id: "infosys-java",
    title: "Java Foundation Certification",
    issuer: "Infosys Springboard",
    period: "Apr 2025",
    badge: "Professional Certificate",
    credentialId: "INF-SB-JAVA-FOUNDATION-2025",
    color: "border-cyan-500/50 bg-cyan-500/10",
    iconColor: "text-cyan-400 bg-cyan-500/20",
    desc: "Comprehensive foundation certification covering object-oriented programming, error handling, collection frameworks, and software development fundamentals.",
    skills: ["Java Basics", "OOP Architecture", "Exception Handling", "File I/O"],
    pdfUrl: "#"
  }
];

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Information Technology",
    institution: "V.S.B Engineering College, Karur, Tamil Nadu",
    period: "2023 – 2027",
    score: "CGPA: 7.82 / 10",
    details: "Focusing on Full-Stack Development, Java Programming, Relational Databases, and Scalable Web Applications.",
    isCurrent: true
  },
  {
    degree: "Higher Secondary Certificate (Class 12) – Computer Science",
    institution: "Govt. Higher Secondary School",
    period: "2023",
    score: "Percentage: 74.3%",
    details: "Specialized in Computer Science, Mathematics, Physics, and Chemistry.",
    isCurrent: false
  },
  {
    degree: "Secondary School Certificate (Class 10)",
    institution: "Mercy Matriculation Higher Secondary School",
    period: "2021",
    score: "Result: Pass",
    details: "Foundational secondary education with distinction in Mathematics and Science subjects.",
    isCurrent: false
  }
];

export function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<string>("All");
  const [activeSkillTab, setActiveSkillTab] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Sync theme to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) {
      setFormStatus("error");
      return;
    }
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMsg("");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1200);
  };

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeProjectTab === "All") return true;
    return p.category === activeProjectTab;
  });

  const filteredSkills = SKILL_CATEGORIES.filter((cat) => {
    if (activeSkillTab === "All") return true;
    return cat.id === activeSkillTab;
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* 1. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-2xl transition-colors duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-11 w-11 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-display font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-foreground sm:text-2xl">
              Dharnish<span className="text-gradient-brand">kumaran R</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Clear, comfortable 16px font) */}
          <nav className="hidden lg:flex items-center gap-8 text-base font-semibold text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-foreground transition-colors">Certifications</a>
            <a href="#profiles" className="hover:text-foreground transition-colors">Coding Profiles</a>
            <a href="#education" className="hover:text-foreground transition-colors">Education</a>
            <a href="#resume" className="hover:text-foreground transition-colors">Resume</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/60 text-foreground shadow-sm hover:bg-accent/60 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
            </button>

            {/* Direct Resume Button */}
            <a
              href="/dharnish_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-brand text-white text-sm font-bold shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              <FileDown className="h-4 w-4" /> Resume PDF
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/60 lg:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-border/40 bg-background/95 lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6 text-base font-semibold">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">About Me</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Technical Skills</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Projects & Live Demos</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Certifications & PDF</a>
                <a href="#profiles" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Coding Profiles</a>
                <a href="#education" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Education</a>
                <a href="#resume" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Resume Download</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground py-1 transition-colors">Contact</a>
                <div className="pt-2">
                  <a
                    href="/dharnish_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-brand text-white text-sm font-bold"
                  >
                    <FileDown className="h-5 w-5" /> Download Resume PDF
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-28 md:pt-24 md:pb-36 bg-grid">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <GradientOrb className="h-[500px] w-[500px] -top-32 left-1/3 opacity-25" />
        <GradientOrb className="h-[350px] w-[350px] top-1/2 right-10 opacity-20 bg-gradient-to-r from-blue-500 to-cyan-500" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Hero Text Left */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-400 backdrop-blur"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                Available for Software Engineering Internships & Roles
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-none text-foreground"
                >
                  Dharnish<span className="text-gradient-brand">kumaran R</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl font-bold sm:text-2xl md:text-3xl font-display flex flex-wrap items-center gap-3 text-foreground/90"
                >
                  <span className="text-indigo-400">Full-Stack Developer</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-purple-400">B.Tech IT Student</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-cyan-400">Java & Automation Developer</span>
                </motion.div>
              </div>

              {/* Pitch Summary (Readable 18px font) */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl text-lg sm:text-xl text-muted-foreground font-sans leading-relaxed"
              >
                B.Tech Information Technology student at <strong className="text-foreground font-semibold">V.S.B. Engineering College</strong>. Strong foundation in <strong className="text-indigo-400 font-semibold">Java</strong>, <strong className="text-purple-400 font-semibold">SQL</strong>, <strong className="text-cyan-400 font-semibold">React</strong>, <strong className="text-foreground font-semibold">TypeScript</strong>, and <strong className="text-indigo-400 font-semibold">Supabase</strong>. Building real-world AI career platforms and process automation engines.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button asChild size="lg" className="bg-gradient-brand text-white hover:opacity-95 shadow-card font-bold text-base px-6 py-6 rounded-2xl cursor-pointer">
                  <a href="#projects" className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> View Projects & Demos
                  </a>
                </Button>

                <Button asChild size="lg" variant="outline" className="border-border/80 bg-card/50 backdrop-blur font-bold text-base px-6 py-6 rounded-2xl hover:bg-accent/60 cursor-pointer">
                  <a href="/dharnish_resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <FileDown className="h-5 w-5 text-indigo-400" /> Resume PDF
                  </a>
                </Button>

                <a
                  href="https://leetcode.com/u/Dharnishkumaranrdk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-3.5 text-base font-bold text-amber-400 hover:bg-amber-500/20 transition-colors"
                >
                  <Trophy className="h-5 w-5" /> LeetCode Profile
                </a>
              </motion.div>

              {/* Direct Profile Links Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-6 pt-4 text-sm font-mono text-muted-foreground"
              >
                <a href="https://github.com/Dharnishkumaran0831" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold">
                  <Github className="h-5 w-5 text-purple-400" /> GitHub: Dharnishkumaran0831
                </a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/dharnishkumaran-r-019986322/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold">
                  <Linkedin className="h-5 w-5 text-indigo-400" /> LinkedIn Profile
                </a>
              </motion.div>
            </div>

            {/* Right Developer Interactive Card */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-[460px] rounded-3xl border border-border/70 bg-card/70 p-6 sm:p-7 shadow-glow backdrop-blur-2xl relative overflow-hidden space-y-6"
              >
                <div className="absolute top-0 right-0 h-36 w-36 bg-gradient-brand opacity-20 blur-2xl pointer-events-none" />
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-display font-extrabold text-xl shadow-md">
                      DK
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground text-lg">Dharnishkumaran R</h3>
                      <p className="text-sm text-indigo-400 font-mono font-semibold">B.Tech IT • V.S.B College</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-bold">
                    CGPA 7.82
                  </span>
                </div>

                {/* Simulated IDE Code Snippet (Comfortable text size) */}
                <div className="rounded-2xl border border-border/50 bg-background/90 p-5 font-mono text-sm space-y-3 text-left shadow-inner">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-2">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                      SoftwareEngineer.java
                    </span>
                    <span className="font-bold text-indigo-400">Java 21</span>
                  </div>

                  <div className="space-y-1.5 leading-relaxed pt-1 text-xs sm:text-sm">
                    <p><span className="text-purple-400 font-semibold">public class</span> <span className="text-amber-300 font-bold">SoftwareEngineer</span> &#123;</p>
                    <p className="pl-4"><span className="text-purple-400">String</span> name = <span className="text-emerald-300">"Dharnishkumaran R"</span>;</p>
                    <p className="pl-4"><span className="text-purple-400">String</span> degree = <span className="text-emerald-300">"B.Tech Information Tech"</span>;</p>
                    <p className="pl-4"><span className="text-purple-400">String[]</span> skills = &#123;<span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"SQL"</span>, <span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"TS"</span>&#125;;</p>
                    <p className="pl-4 pt-1"><span className="text-purple-400">public void</span> <span className="text-blue-300 font-bold">buildProjects</span>() &#123;</p>
                    <p className="pl-8 text-indigo-300">System.out.println(<span className="text-emerald-300">"CareerPilot AI & Policy Flow AI!"</span>);</p>
                    <p className="pl-4">&#125;</p>
                    <p>&#125;</p>
                  </div>
                </div>

                {/* Quick Highlight Stats Grid */}
                <div className="grid grid-cols-2 gap-3.5 text-left">
                  <div className="glass rounded-2xl p-3.5 border border-border/50">
                    <p className="text-xs text-muted-foreground font-mono uppercase font-semibold">Full-Stack AI</p>
                    <p className="font-bold text-sm text-indigo-400 truncate">CareerPilot AI</p>
                  </div>
                  <div className="glass rounded-2xl p-3.5 border border-border/50">
                    <p className="text-xs text-muted-foreground font-mono uppercase font-semibold">Automation Engine</p>
                    <p className="font-bold text-sm text-purple-400 truncate">Policy Flow AI</p>
                  </div>
                  <div className="glass rounded-2xl p-3.5 border border-border/50">
                    <p className="text-xs text-muted-foreground font-mono uppercase font-semibold">Infosys Springboard</p>
                    <p className="font-bold text-sm text-cyan-400 truncate">InsurAI Internship</p>
                  </div>
                  <div className="glass rounded-2xl p-3.5 border border-border/50">
                    <p className="text-xs text-muted-foreground font-mono uppercase font-semibold">NPTEL Certified</p>
                    <p className="font-bold text-sm text-emerald-400 truncate">Java Programming</p>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT ME */}
      <section id="about" className="py-28 border-t border-border/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              About <span className="text-gradient-brand">Me</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              B.Tech Information Technology student with a strong passion for full-stack engineering, clean code architecture, and automated enterprise workflows.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1: IT Engineering */}
            <div className="glass rounded-3xl p-7 flex flex-col justify-between border border-border/40 hover:border-indigo-500/50 hover:shadow-card transition-all group">
              <div className="space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">IT Engineering Foundation</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Currently pursuing B.Tech in Information Technology at V.S.B Engineering College, Karur (CGPA: 7.82). Grounded in core computer science, software development life cycles, and database design.
                </p>
              </div>
              <div className="pt-6 border-t border-border/20 mt-6 text-sm font-bold text-indigo-400 font-mono">
                V.S.B Engineering College (2023 – 2027)
              </div>
            </div>

            {/* Card 2: Full-Stack & Web Dev */}
            <div className="glass rounded-3xl p-7 flex flex-col justify-between border border-border/40 hover:border-purple-500/50 hover:shadow-card transition-all group">
              <div className="space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <Code2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">Full-Stack Development</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Experienced in building complete end-to-end applications using React, TypeScript, Supabase, and SQL. Focused on fast load speeds, intuitive interfaces, and robust backend logic.
                </p>
              </div>
              <div className="pt-6 border-t border-border/20 mt-6 text-sm font-bold text-purple-400 font-mono">
                React • TypeScript • Supabase • Vercel
              </div>
            </div>

            {/* Card 3: Process Automation & Logic */}
            <div className="glass rounded-3xl p-7 flex flex-col justify-between border border-border/40 hover:border-cyan-500/50 hover:shadow-card transition-all group md:col-span-2 lg:col-span-1">
              <div className="space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">Process Automation & AI</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Passionate about designing decision-tree logic, automated policy processing, and integrating AI capabilities (ATS resume analysis, automated mock interview simulations).
                </p>
              </div>
              <div className="pt-6 border-t border-border/20 mt-6 text-sm font-bold text-cyan-400 font-mono">
                Automation Logic • AI Workflows
              </div>
            </div>

          </div>

          {/* Personal Quick Info Bar (Normal readable font) */}
          <div className="mt-14 glass rounded-3xl p-7 border border-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-mono uppercase font-bold tracking-wider">Current Location</p>
              <p className="text-base font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-400" /> Tiruppur, Tamil Nadu, India
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-mono uppercase font-bold tracking-wider">Email Address</p>
              <a href="mailto:dharnishkumaranrdk@gmail.com" className="text-base font-semibold text-foreground hover:text-indigo-400 transition-colors flex items-center gap-2 truncate">
                <Mail className="h-5 w-5 text-purple-400" /> dharnishkumaranrdk@gmail.com
              </a>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-mono uppercase font-bold tracking-wider">Phone Number</p>
              <a href="tel:+919025098079" className="text-base font-semibold text-foreground hover:text-indigo-400 transition-colors flex items-center gap-2">
                <Phone className="h-5 w-5 text-cyan-400" /> +91 9025098079
              </a>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-mono uppercase font-bold tracking-wider">Languages Spoken</p>
              <p className="text-base font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-400" /> Tamil, English, Kannada
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SKILLS SECTION WITH INTERACTIVE FILTER TABS */}
      <section id="skills" className="py-28 border-t border-border/40 bg-card/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              Technical <span className="text-gradient-brand">Skills & Stack</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              A comprehensive breakdown of technical proficiencies across core programming, web frameworks, and specialized domains.
            </p>
          </div>

          {/* Interactive Skill Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {[
              { id: "All", label: "All Skills" },
              { id: "languages", label: "Languages & Core" },
              { id: "web", label: "Web Technologies" },
              { id: "specialized", label: "Specialized Domains" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                  activeSkillTab === tab.id
                    ? "bg-gradient-brand text-white shadow-md"
                    : "bg-card/70 border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {filteredSkills.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div key={cat.category} className="glass rounded-3xl p-7 border border-border/50 relative overflow-hidden space-y-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
                  
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${cat.color}`}>
                        <IconComp className="h-6 w-6" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground">{cat.category}</h3>
                    </div>

                    {/* Skill List */}
                    <div className="space-y-6">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-foreground flex items-center gap-2 text-base">
                              <CheckCircle2 className="h-4 w-4 text-indigo-400" /> {skill.name}
                            </span>
                            <span className="font-mono text-muted-foreground text-xs font-bold">{skill.level}%</span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="h-2 w-full bg-muted/80 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-brand rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                          </div>
                          
                          <p className="text-xs text-muted-foreground font-medium">{skill.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Skill Tags Cloud (Normal text size) */}
          <div className="mt-14 flex flex-wrap justify-center gap-2.5 text-sm font-mono">
            {["Java", "SQL", "HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Supabase", "Git", "GitHub", "Vercel", "Vite", "Process Automation", "REST APIs", "Data Structures"].map((tag) => (
              <span key={tag} className="bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-indigo-500/50 px-4 py-2 rounded-2xl transition-all shadow-sm font-semibold">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PROJECTS SECTION WITH DIRECT LIVE DEMO & GITHUB LINKS */}
      <section id="projects" className="py-28 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              Featured <span className="text-gradient-brand">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Real-world applications built to solve genuine student placement & enterprise workflow challenges. Direct GitHub links & Live Demos available below!
            </p>
          </div>

          {/* Project Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["All", "Full-Stack AI", "Process Automation"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-5 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                  activeProjectTab === tab
                    ? "bg-gradient-brand text-white shadow-md"
                    : "bg-card/70 border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group overflow-hidden rounded-3xl border border-border/50 bg-card/50 shadow-card hover:border-primary/60 hover:shadow-glow transition-all flex flex-col justify-between relative"
              >
                {/* Image Mockup Header */}
                <div 
                  onClick={() => setSelectedProject(proj)}
                  className="aspect-[16/9] w-full overflow-hidden bg-muted relative border-b border-border/30 cursor-pointer"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-indigo-600 text-white text-xs font-bold py-1 px-3.5 rounded-full uppercase tracking-wider shadow">
                      {proj.date}
                    </span>
                    <span className="bg-purple-600 text-white text-xs font-bold py-1 px-3.5 rounded-full uppercase tracking-wider shadow">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-5 text-left">
                  
                  <div className="space-y-3">
                    <h3 
                      onClick={() => setSelectedProject(proj)}
                      className="text-2xl sm:text-3xl font-bold font-display text-foreground group-hover:text-primary transition-colors cursor-pointer flex items-center justify-between"
                    >
                      {proj.title}
                      <ArrowUpRight className="h-6 w-6 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </h3>

                    <p className="text-sm font-bold text-indigo-400 font-mono">
                      {proj.subtitle}
                    </p>

                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-xs font-mono font-semibold bg-muted/90 text-muted-foreground px-3 py-1 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Buttons on Card (Live Demo & GitHub) */}
                  <div className="pt-4 border-t border-border/30 flex flex-wrap gap-3">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-brand text-white text-sm font-bold shadow hover:opacity-95 transition-opacity"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-card border border-border/80 text-foreground text-sm font-bold hover:bg-accent transition-colors"
                      >
                        <Github className="h-4 w-4 text-purple-400" /> GitHub Code
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="py-2.5 px-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-bold hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Details <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROJECT MODAL LIGHTBOX */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-4 sm:p-6 md:p-10 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-4xl bg-card border border-border/80 rounded-3xl shadow-glow overflow-hidden relative max-h-[90vh] flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-card border-b border-border/40 px-6 py-5 flex justify-between items-center z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground">{selectedProject.title}</h3>
                  <p className="text-sm text-indigo-400 font-mono font-bold">{selectedProject.subtitle} • {selectedProject.date}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-foreground hover:bg-accent transition-colors cursor-pointer"
                  aria-label="Close Project Details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* Mockup */}
                <div className="rounded-2xl overflow-hidden border border-border/40 shadow-md">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full aspect-[21/9] object-cover" />
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="glass rounded-2xl p-6 border border-red-500/30 space-y-3">
                    <h4 className="font-bold font-display text-red-400 text-base flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Challenge / Problem
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-emerald-500/30 space-y-3">
                    <h4 className="font-bold font-display text-emerald-400 text-base flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Engineering Solution
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-display text-foreground border-b border-border/30 pb-2">
                    Key Features & Technical Implementations
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2 text-sm sm:text-base">
                    {selectedProject.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase font-mono text-muted-foreground">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-xl text-sm font-mono font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border/40 px-6 py-5 flex flex-col sm:flex-row gap-4 justify-between items-center z-10">
                <span className="text-sm text-muted-foreground font-mono">Developer: Dharnishkumaran R</span>
                <div className="flex gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-card border border-border/80 text-foreground text-sm font-bold hover:bg-accent transition-colors"
                    >
                      <Github className="h-4 w-4" /> GitHub Repository
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-brand text-white text-sm font-bold hover:opacity-95 transition-opacity shadow"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. CERTIFICATIONS & TRAINING (WITH CERTIFICATE PDF VIEWER MODAL) */}
      <section id="certifications" className="py-28 border-t border-border/40 bg-card/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              Certifications & <span className="text-gradient-brand">Internships</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Verified corporate training, national certifications, and technical internships. Click any card to view credential details or download the PDF document.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id} 
                className={`glass rounded-3xl p-7 border ${cert.color} space-y-5 text-left flex flex-col justify-between hover:shadow-card transition-all group`}
              >
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${cert.iconColor} group-hover:scale-110 transition-transform`}>
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono font-bold bg-card border border-border/60 px-3 py-1 rounded-full text-muted-foreground">
                      {cert.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold font-display text-xl text-foreground leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-bold text-indigo-400 font-mono mt-1">
                      {cert.issuer} • {cert.period}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((s) => (
                      <span key={s} className="text-xs font-mono bg-muted/80 text-muted-foreground px-2.5 py-0.5 rounded-md font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Certificate Actions */}
                <div className="pt-4 border-t border-border/30 flex gap-3">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-bold hover:bg-indigo-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Award className="h-4 w-4 text-amber-400" /> View Official Certificate Document
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CERTIFICATE MODAL LIGHTBOX WITH DEDICATED CERTIFICATE FRAME */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-card border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-glow text-left overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Close Button */}
              <div className="flex justify-between items-center border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Official Certificate Verification</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="h-9 w-9 rounded-2xl bg-muted flex items-center justify-center text-foreground hover:bg-accent cursor-pointer"
                  aria-label="Close Certificate Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* DEDICATED OFFICIAL CERTIFICATE DOCUMENT FRAME */}
              <div className="rounded-2xl border-4 border-double border-amber-500/40 bg-background/90 p-6 sm:p-8 space-y-6 relative text-center shadow-inner overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Certificate Header Banner */}
                <div className="space-y-2">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-md mb-1">
                    <Award className="h-8 w-8 text-amber-300" />
                  </div>
                  <p className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">Verified Credentials & Endorsements</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground tracking-tight">
                    CERTIFICATE OF ACCOMPLISHMENT
                  </h2>
                  <p className="text-sm font-semibold text-indigo-400 font-mono">{selectedCert.issuer}</p>
                </div>

                <div className="h-[2px] w-3/4 mx-auto bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                {/* Recipient Details */}
                <div className="space-y-2 py-2">
                  <p className="text-xs font-mono uppercase text-muted-foreground font-bold">This is proudly presented to</p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-gradient-brand tracking-wide">
                    DHARNISHKUMARAN R
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed pt-1">
                    for successfully demonstrating proficiency and completing all curriculum & evaluation requirements for
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-foreground font-display pt-1">
                    {selectedCert.title}
                  </p>
                </div>

                {/* Credential Seal & Verification ID */}
                <div className="grid gap-4 sm:grid-cols-2 text-left pt-3 border-t border-border/30">
                  <div className="glass rounded-xl p-3.5 border border-indigo-500/30 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-mono uppercase font-bold">Credential Verification ID</p>
                    <p className="font-mono text-indigo-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {selectedCert.credentialId}
                    </p>
                  </div>

                  <div className="glass rounded-xl p-3.5 border border-purple-500/30 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-mono uppercase font-bold">Period & Status</p>
                    <p className="font-mono text-purple-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" /> {selectedCert.period} • Verified
                    </p>
                  </div>
                </div>

                {/* Verified Skills */}
                <div className="space-y-2 pt-2 text-left">
                  <p className="text-xs font-mono font-bold text-muted-foreground uppercase">Skills Endorsed & Evaluated:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((s) => (
                      <span key={s} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Authenticated Engineering Credential
                </span>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none bg-gradient-brand text-white text-sm font-bold px-6 py-2.5 rounded-2xl shadow hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileDown className="h-4 w-4" /> Print / Save Certificate
                  </Button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. CODING PROFILES SHOWCASE */}
      <section id="profiles" className="py-28 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              Coding Profiles & <span className="text-gradient-brand">Activity</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore my competitive programming practice, open-source repositories, and professional network.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            
            {/* LeetCode Card */}
            <div className="glass rounded-3xl p-7 border border-amber-500/40 hover:border-amber-500/70 transition-all space-y-6 text-left flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 px-3.5 py-1.5 rounded-full border border-amber-500/30">
                    LeetCode
                  </span>
                </div>

                <div>
                  <h3 className="font-bold font-display text-2xl text-foreground">LeetCode Profile</h3>
                  <p className="text-sm font-mono text-amber-400 font-bold mt-1">@Dharnishkumaranrdk</p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Actively practicing Data Structures, Java Algorithms, and SQL Query optimization to refine problem-solving skills.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Target Language:</span>
                    <span className="text-foreground font-bold">Java & SQL</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Focus Areas:</span>
                    <span className="text-foreground font-bold">Arrays, Trees, SQL</span>
                  </div>
                </div>
              </div>

              <a
                href="https://leetcode.com/u/Dharnishkumaranrdk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                View LeetCode Profile <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="glass rounded-3xl p-7 border border-purple-500/40 hover:border-purple-500/70 transition-all space-y-6 text-left flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-mono font-bold bg-purple-500/10 text-purple-400 px-3.5 py-1.5 rounded-full border border-purple-500/30">
                    GitHub
                  </span>
                </div>

                <div>
                  <h3 className="font-bold font-display text-2xl text-foreground">GitHub Workspace</h3>
                  <p className="text-sm font-mono text-purple-400 font-bold mt-1">@Dharnishkumaran0831</p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Open-source repositories hosting CareerPilot AI, Policy Flow AI, and full-stack project implementations.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Key Repos:</span>
                    <span className="text-foreground font-bold">CareerPilot AI, PolicyFlow</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Primary Stack:</span>
                    <span className="text-foreground font-bold">React, TypeScript, Java</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/Dharnishkumaran0831"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Explore GitHub Repositories <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="glass rounded-3xl p-7 border border-indigo-500/40 hover:border-indigo-500/70 transition-all space-y-6 text-left flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3.5 py-1.5 rounded-full border border-indigo-500/30">
                    LinkedIn
                  </span>
                </div>

                <div>
                  <h3 className="font-bold font-display text-2xl text-foreground">LinkedIn Network</h3>
                  <p className="text-sm font-mono text-indigo-400 font-bold mt-1">dharnishkumaran-r-019986322</p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Professional connection channel showcasing project milestones, Infosys certifications, and engineering updates.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-bold">Open for Connections</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Location:</span>
                    <span className="text-foreground font-bold">Tiruppur / Karur, TN</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/dharnishkumaran-r-019986322/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Connect on LinkedIn <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 8. EDUCATION TIMELINE */}
      <section id="education" className="py-28 border-t border-border/40 bg-card/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground">
              Education <span className="text-gradient-brand">Timeline</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Academic background and engineering qualification history.
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto space-y-8 text-left">
            {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className="glass rounded-3xl p-7 border border-border/50 relative flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/50 transition-colors">
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                    <h3 className="font-bold font-display text-xl sm:text-2xl text-foreground">{edu.degree}</h3>
                  </div>
                  <p className="text-base font-bold text-indigo-400 font-mono">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{edu.details}</p>
                </div>

                <div className="md:text-right space-y-2 flex-shrink-0">
                  <span className="inline-block text-sm font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/40 px-4 py-1.5 rounded-full">
                    {edu.period}
                  </span>
                  <p className="text-base font-bold text-emerald-400 font-mono pt-1">{edu.score}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. RESUME DOWNLOAD SECTION */}
      <section id="resume" className="py-28 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Visual Resume Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[400px] aspect-[1/1.3] bg-card border border-border/80 rounded-3xl p-7 shadow-glow relative overflow-hidden flex flex-col justify-between text-left group">
                <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-brand opacity-15 blur-xl group-hover:scale-125 transition-transform pointer-events-none" />
                
                {/* Document Header */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold font-display text-foreground">DHARNISHKUMARAN R</h4>
                      <p className="text-xs text-indigo-400 font-mono font-bold">dharnish_resume.pdf</p>
                    </div>
                    <FileDown className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="h-[1px] w-full bg-border/40" />
                </div>

                {/* Simulated Text Body */}
                <div className="flex-1 py-4 space-y-4 text-xs text-muted-foreground font-sans">
                  <div className="space-y-1">
                    <p className="font-bold text-foreground uppercase font-mono text-xs tracking-wider text-indigo-400">Professional Summary</p>
                    <p className="line-clamp-3 leading-relaxed">B.Tech IT student with strong foundation in Java, SQL, and front-end web technologies (HTML, CSS, JavaScript, React, TypeScript). Hands-on experience building real-world projects...</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-foreground uppercase font-mono text-xs tracking-wider text-indigo-400">Core Technical Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Java", "SQL", "HTML/CSS", "JavaScript", "React", "TypeScript", "Supabase"].map((s) => (
                        <span key={s} className="bg-muted px-2.5 py-1 rounded-md text-xs font-mono font-bold text-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-foreground uppercase font-mono text-xs tracking-wider text-indigo-400">Key Projects</p>
                    <p className="font-bold text-foreground text-xs">1. CareerPilot AI (Jul 2026)</p>
                    <p className="font-bold text-foreground text-xs">2. Policy Flow AI (Dec 2025)</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-border/30 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-mono text-xs font-bold">Official Resume File</span>
                  <a
                    href="/dharnish_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    View Document <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Text Info */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h2 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
                Download Official <span className="text-gradient-brand">Resume</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Need a printable PDF version of my resume for internship screening or recruitment evaluation? Download the complete resume detailing academic CGPA, full-stack projects, and Infosys Springboard certifications.
              </p>
              
              <div className="space-y-4 text-base">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground">Includes full B.Tech IT academic records & CGPA</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground">Detailed Infosys Springboard Internship & NPTEL credentials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground">Direct contact info & verified profile links</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-brand text-white font-bold text-base px-7 py-6 rounded-2xl flex items-center gap-2 shadow-glow cursor-pointer">
                  <a href="/dharnish_resume.pdf" download="Dharnishkumaran_R_Resume.pdf">
                    <FileDown className="h-5 w-5" /> Download PDF Resume
                  </a>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="py-28 border-t border-border/40 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Contact Details Left */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold font-display tracking-tight text-foreground sm:text-5xl">
                  Get in <span className="text-gradient-brand">Touch</span>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Have an exciting software engineering internship role, full-stack project, or opportunity? Feel free to reach out directly!
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider font-mono">Direct Email</p>
                    <a href="mailto:dharnishkumaranrdk@gmail.com" className="text-base font-semibold text-foreground hover:text-indigo-400 transition-colors">
                      dharnishkumaranrdk@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider font-mono">Phone Number</p>
                    <a href="tel:+919025098079" className="text-base font-semibold text-foreground hover:text-cyan-400 transition-colors">
                      +91 9025098079
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-4 group">
                  <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider font-mono">LinkedIn Profile</p>
                    <a href="https://www.linkedin.com/in/dharnishkumaran-r-019986322/" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-foreground hover:text-purple-400 transition-colors">
                      linkedin.com/in/dharnishkumaran-r
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider font-mono">Location</p>
                    <p className="text-base font-semibold text-foreground">
                      Tiruppur, Tamil Nadu, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form Right */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="glass border border-border/50 rounded-3xl p-7 md:p-9 space-y-6 text-left shadow-card">
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wide font-mono">Your Full Name</label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-card/70 border border-border/80 rounded-2xl px-5 py-3.5 text-base text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wide font-mono">Your Email Address</label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="e.g. alex@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-card/70 border border-border/80 rounded-2xl px-5 py-3.5 text-base text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wide font-mono">Subject / Purpose</label>
                  <input
                    id="subject-input"
                    type="text"
                    placeholder="e.g. Software Engineering Opportunity"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-card/70 border border-border/80 rounded-2xl px-5 py-3.5 text-base text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wide font-mono">Your Message</label>
                  <textarea
                    id="message-input"
                    rows={4}
                    placeholder="Hi Dharnishkumaran, I reviewed your portfolio..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-card/70 border border-border/80 rounded-2xl px-5 py-3.5 text-base text-foreground focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full bg-gradient-brand text-white font-bold text-base flex items-center justify-center gap-2 shadow cursor-pointer py-4 rounded-2xl"
                  >
                    {formStatus === "sending" ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Send Direct Message
                      </>
                    )}
                  </Button>
                </div>

                {/* Feedback Alerts */}
                {formStatus === "success" && (
                  <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-sm rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>Thank you! Your message has been sent successfully. Dharnishkumaran R will get back to you shortly.</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <span>Please fill in all required fields before submitting.</span>
                  </div>
                )}

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-14 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-xl font-bold font-display tracking-tight text-foreground">
              Dharnish<span className="text-gradient-brand">kumaran R</span>
            </span>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Dharnishkumaran R. All rights reserved.</p>
          </div>

          <div className="flex gap-3.5">
            <a href="https://github.com/Dharnishkumaran0831" target="_blank" rel="noopener noreferrer" className="h-11 w-11 bg-card/70 hover:bg-accent border border-border/50 rounded-2xl flex items-center justify-center text-foreground hover:text-purple-400 transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/dharnishkumaran-r-019986322/" target="_blank" rel="noopener noreferrer" className="h-11 w-11 bg-card/70 hover:bg-accent border border-border/50 rounded-2xl flex items-center justify-center text-foreground hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://leetcode.com/u/Dharnishkumaranrdk/" target="_blank" rel="noopener noreferrer" className="h-11 w-11 bg-card/70 hover:bg-accent border border-border/50 rounded-2xl flex items-center justify-center text-foreground hover:text-amber-400 transition-colors" aria-label="LeetCode">
              <Trophy className="h-5 w-5" />
            </a>
            <a href="mailto:dharnishkumaranrdk@gmail.com" className="h-11 w-11 bg-card/70 hover:bg-accent border border-border/50 rounded-2xl flex items-center justify-center text-foreground hover:text-cyan-400 transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
