# 🚨 CrisisLens — Emergency Response & AI Intelligence Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-crisislens--emergency.bolt.host-00C853?style=for-the-badge&logo=bolt&logoColor=white)](https://crisislens-emergency-jzd5.bolt.host)
[![GitHub Repository](https://img.shields.io/badge/🐙_GitHub_Repo-Dharnishkumaran0831%2Fcrisislens-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dharnishkumaran0831/crisislens)
[![License: MIT](https://img.shields.io/badge/License-MIT-7B1FA2?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.16-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**CrisisLens** is an advanced, high-performance web platform engineered for **real-time emergency incident dispatching, disaster triage management, and integrated AI-driven career intelligence**.

Designed and built by **Dharnishkumaran R** (*B.Tech Information Technology, V.S.B. Engineering College*).

[🌐 View Live Application](https://crisislens-emergency-jzd5.bolt.host) • [📁 Explore GitHub Repository](https://github.com/Dharnishkumaran0831/crisislens)

</div>

---

## 📌 Executive Overview

**CrisisLens** bridges emergency situation handling with intelligent decision automation. Operating during critical events, natural disasters, or enterprise escalation scenarios, CrisisLens provides:

1. **⚡ Incident Triage & Emergency Dispatch**: High-speed, interactive dashboard for logging, categorizing, and routing emergency reports to active responders.
2. **🎯 AI-Powered Career & Skill Ecosystem**: Automated ATS resume scanning, dynamic technical mock interview simulations, and step-by-step career path roadmaps.
3. **💼 Professional Developer Portfolio**: Showcasing full-stack engineering work, process automation engines (PolicyFlow AI), and industry certifications (Infosys Springboard, NPTEL).

---

## ✨ Key Features & Capability Matrix

| Feature Module | Technical Highlights | Domain Value |
| :--- | :--- | :--- |
| **🚨 Emergency Triage Engine** | Real-time incident categorization, emergency urgency classification, and priority dispatching console. | Minimizes reaction latency during critical disaster scenarios. |
| **🤖 AI ATS Resume Scoring** | Analyzes uploaded resume text against targeted job descriptions with keyword optimization metrics. | Empowers job seekers to pass automated recruiter screeners. |
| **🎙️ Interactive AI Mock Interviewer** | Dynamic system simulating real technical questions with automated response evaluation. | Builds practical interview readiness for software engineering roles. |
| **🗺️ Skill Roadmaps & Analytics** | Interactive step-by-step skill trees and DSA tracking dashboards. | Provides clear career development pathways for students. |
| **⚡ High-Performance Architecture** | Built with React 19, TypeScript, TanStack Router, Supabase, and Tailwind CSS v4. | Delivers lightning-fast page transitions & glassmorphic UI aesthetics. |

---

## 🚀 Live Deployment & Links

- 🌐 **Live Demo URL**: [https://crisislens-emergency-jzd5.bolt.host](https://crisislens-emergency-jzd5.bolt.host)
- 📦 **GitHub Repository**: [https://github.com/Dharnishkumaran0831/crisislens](https://github.com/Dharnishkumaran0831/crisislens)

---

## 🛠️ Technology Stack & Architecture

### **Frontend & Interface**
- **React 19**: Modern component lifecycle, server component compatibility, and fast rendering.
- **TypeScript 5.8**: Strict static typing for bug prevention and enhanced DX.
- **Vite 8 & TanStack Router**: Instant HMR, type-safe routing, and optimized bundle splitting.
- **Tailwind CSS v4 & Framer Motion**: Glassmorphism aesthetic, custom gradient design system, and smooth micro-animations.
- **Lucide Icons & Radix UI**: Accessible primitives and high-quality iconography.

### **Backend & Database Services**
- **Supabase**: Real-time database streams, PostgreSQL instance, row-level security (RLS), and authentication.
- **TanStack Start Server API**: API route handlers for AI processing (`/api/ai`, `/api/chat`).
- **Node.js & PDF Utilities**: `pdf-lib` & `pdf-parse` scripts for dynamic PDF resume metadata manipulation.

---

## 💻 Local Development & Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm** (v9+) or **bun** (v1.0+)
- **Git**

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dharnishkumaran0831/crisislens.git

# 2. Navigate into the project folder
cd crisislens

# 3. Install dependencies
npm install

# 4. Configure Environment Variables
cp .env.example .env
```

### Environment Configuration (`.env`)

Configure your Supabase & AI API credentials in `.env`:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_AI_GATEWAY_KEY=your-ai-gateway-api-key
```

### Running Locally

```bash
# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build & Preview

```bash
# Compile production bundle
npm run build

# Run postbuild optimizations
npm run postbuild

# Preview production build locally
npm run preview
```

---

## 📂 Repository Directory Structure

```
crisislens/
├── public/                 # Static assets, mockups, favicon, & resume PDF
├── src/
│   ├── components/         # Reusable UI components & Radix UI primitives
│   │   ├── ui/             # Buttons, Cards, Dialogs, Selects, Tooltips
│   │   └── gradient-orb.tsx# Glassmorphic lighting background orb
│   ├── config/             # Site metadata & author site.ts configuration
│   ├── data/               # Project data, skill trees, and testimonials
│   ├── hooks/              # Custom React hooks (useTheme, useScrollToTop, etc.)
│   ├── integrations/       # Supabase client initialization & types
│   ├── lib/                # Utilities, analytics tracker, error capture
│   ├── routes/             # TanStack routing tree & API endpoints
│   │   ├── api/            # Serverless AI & chat endpoints
│   │   ├── index.tsx       # Main CrisisLens dashboard & portfolio page
│   │   └── __root.tsx      # Root shell, HTML head tags, & layout wrappers
│   └── types/              # TypeScript domain interface definitions
├── add_project_to_pdf.cjs  # PDF resume builder script
├── edit_pdf.cjs            # PDF link annotation updater
├── postbuild.js            # Build script for static host deployment
├── package.json            # Dependencies & npm script commands
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build pipeline & plugin configuration
```

---

## 👨‍💻 Author Profile

**Dharnishkumaran R**  
*B.Tech in Information Technology — V.S.B. Engineering College, Karur, Tamil Nadu*  
*Specialized in Full-Stack Web Development, Java OOP, SQL, Process Automation, & AI Systems*

- 🌐 **Live Demo**: [https://crisislens-emergency-jzd5.bolt.host](https://crisislens-emergency-jzd5.bolt.host)
- 🐙 **GitHub**: [@Dharnishkumaran0831](https://github.com/Dharnishkumaran0831)
- 💼 **LinkedIn**: [Dharnishkumaran R](https://www.linkedin.com/in/dharnishkumaran-r-019986322/)
- 🏆 **LeetCode**: [Dharnishkumaranrdk](https://leetcode.com/u/Dharnishkumaranrdk/)
- ✉️ **Email**: [dharnishkumaranrdk@gmail.com](mailto:dharnishkumaranrdk@gmail.com)

---

<div align="center">

*Designed & Engineered with ❤️ by **Dharnishkumaran R***

</div>
