# 🚀 CareerPilot AI & Portfolio Application

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)

An intelligent AI-powered Career Guidance Platform and Interactive Developer Portfolio for **Dharnishkumaran R**, B.Tech Information Technology student at V.S.B. Engineering College.

---

## ✨ Features

- 🎯 **AI Career Counseling**: Personalized career roadmap generation based on student skills and goals.
- 💼 **Interactive Portfolio**: Showcasing full-stack applications (Medichain, InsurAI, Smart Wardrobe, CareerPilot).
- 📬 **Direct Contact Interface**: Integrated contact form with automatic status handling.
- 📄 **PDF Utilities**: Custom Node.js scripts for parsing, modifying, and injecting metadata into PDF resumes.
- 🎨 **Modern Design**: Dark-mode glassmorphic UI built with Tailwind CSS, Lucide icons, and Radix UI components.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TanStack Router, Tailwind CSS, Lucide React
- **Backend / Services**: Supabase Authentication & Database
- **Utilities**: `pdf-lib`, `pdf-parse`, Custom Node.js scripts

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Dharnishkumaran0831/career-Ai.git
cd career-Ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run postbuild
```

---

## 📁 Repository Structure

```
├── public/                 # Static assets, project mockups, & resume PDF
├── src/
│   ├── components/         # UI components & design system tokens
│   ├── routes/             # TanStack routing (Landing page, Auth, Dashboard)
│   └── lib/                # Supabase client & core utilities
├── add_project_to_pdf.cjs  # Utility to append projects into PDF resume
├── edit_pdf.cjs            # Utility to update link annotations in PDF
├── inspect_pdf.js          # Helper to extract PDF text structure
├── postbuild.js            # Build script for static host deployment
└── package.json            # Node project configuration
```

---

## 👨‍💻 Author

**Dharnishkumaran R**
- **GitHub**: [@Dharnishkumaran0831](https://github.com/Dharnishkumaran0831)
- **LinkedIn**: [Dharnishkumaran R](https://www.linkedin.com/in/dharnishkumaran-r-019986322/)
- **LeetCode**: [Dharnishkumaranrdk](https://leetcode.com/u/Dharnishkumaranrdk/)
- **Email**: dharnishkumaranrdk@gmail.com
