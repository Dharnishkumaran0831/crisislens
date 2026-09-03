import { RoadmapItem } from '../types/testimonials';

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: 'phase-1',
    phase: 'Phase 01',
    title: 'Core Full-Stack & UI Foundation',
    description: 'Master modern frontend architectures, React 19, TypeScript, and responsive glassmorphic styling.',
    skillsCovered: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'completed',
    estimatedDuration: 'Completed',
  },
  {
    id: 'phase-2',
    phase: 'Phase 02',
    title: 'Backend Integration & Supabase Databases',
    description: 'Implement secure OAuth authentication, relational PostgreSQL schemas, and serverless API handlers.',
    skillsCovered: ['Supabase', 'PostgreSQL', 'REST APIs', 'Node.js'],
    status: 'completed',
    estimatedDuration: 'Completed',
  },
  {
    id: 'phase-3',
    phase: 'Phase 03',
    title: 'AI Model Gateways & Vector Indexing',
    description: 'Integrate LLM API endpoints, automated career assessment scoring, and custom PDF parsing pipelines.',
    skillsCovered: ['Gemini API', 'Vector Embeddings', 'pdf-lib', 'AI Prompt Engineering'],
    status: 'in-progress',
    estimatedDuration: 'Current Focus',
  },
  {
    id: 'phase-4',
    phase: 'Phase 04',
    title: 'Cloud Infrastructure & Micro-Frontends',
    description: 'Deploy global edge functions, automated CI/CD GitHub Workflows, and real-time performance analytics.',
    skillsCovered: ['Vercel Edge', 'Docker', 'GitHub Actions', 'Web Vitals'],
    status: 'upcoming',
    estimatedDuration: 'Q4 2026',
  },
];
