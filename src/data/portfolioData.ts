import { Project, SkillCategory } from '../types/portfolio';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'crisislens',
    title: 'CrisisLens Emergency AI',
    description: 'Real-time emergency incident dispatching, crisis analytics, and AI career guidance platform.',
    category: 'Full-Stack',
    tags: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'Tailwind CSS'],
    imageUrl: '/careerpilot_mockup.jpg',
    githubUrl: 'https://github.com/Dharnishkumaran0831/crisislens',
    liveUrl: 'https://crisislens-emergency-jzd5.bolt.host',
    featured: true,
  },
  {
    id: 'career-pilot-ai',
    title: 'CareerPilot AI',
    description: 'AI-driven career guidance platform offering personalized skill assessment and career path recommendations.',
    category: 'Full-Stack',
    tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind CSS'],
    imageUrl: '/careerpilot_mockup.jpg',
    githubUrl: 'https://github.com/Dharnishkumaran0831/crisislens',
    liveUrl: 'https://crisislens-emergency-jzd5.bolt.host',
    featured: true,
  },
  {
    id: 'insur-ai',
    title: 'InsurAI Project',
    description: 'Smart insurance policy analyzer and recommendation dashboard utilizing machine learning insights.',
    category: 'AI / ML',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    imageUrl: '/insurai_mockup.jpg',
    githubUrl: 'https://github.com/Dharnishkumaran0831/InsurAI-Project',
    featured: true,
  },
  {
    id: 'medichain-ai',
    title: 'Medichain AI',
    description: 'Decentralized healthcare record management with automated AI diagnostic integration.',
    category: 'Blockchain',
    tags: ['JavaScript', 'React', 'Node.js', 'Web3'],
    imageUrl: '/medichain_mockup.jpg',
    githubUrl: 'https://github.com/Dharnishkumaran0831/medichain-ai',
    featured: true,
  },
  {
    id: 'smart-wardrobe',
    title: 'Smart Wardrobe Assistant',
    description: 'AI outfit curation system matching daily weather forecasts with personal wardrobe inventory.',
    category: 'Web App',
    tags: ['React', 'TypeScript', 'Lucide Icons'],
    imageUrl: '/wardrobe_mockup.jpg',
    featured: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React 19 / Vite', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS / Glassmorphism', level: 92 },
      { name: 'Next.js / TanStack Router', level: 80 },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'Supabase / PostgreSQL', level: 85 },
      { name: 'REST APIs & GraphQL', level: 88 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    title: 'Developer Tools',
    skills: [
      { name: 'Git & GitHub Workflows', level: 90 },
      { name: 'Vercel / Cloudflare Deployment', level: 85 },
      { name: 'VS Code & Gemini Antigravity CLI', level: 95 },
    ],
  },
];
