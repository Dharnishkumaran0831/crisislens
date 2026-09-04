import { PromptPreset } from '../types/chat';

export const CHAT_PRESETS: PromptPreset[] = [
  {
    id: 'preset-1',
    title: 'Full-Stack Career Roadmap',
    prompt: 'What are the essential technical milestones to become a Senior Full-Stack Engineer in 2026?',
    category: 'Career Guidance',
    icon: 'Compass',
  },
  {
    id: 'preset-2',
    title: 'Analyze My Skillset',
    prompt: 'Evaluate my current skills in React, TypeScript, and Supabase. What complementary backend tools should I learn next?',
    category: 'Skill Assessment',
    icon: 'Brain',
  },
  {
    id: 'preset-3',
    title: 'Resume Project Suggestions',
    prompt: 'Suggest 3 impressive real-world AI and Web3 project ideas that stand out to tech recruiters.',
    category: 'Resume Review',
    icon: 'FileText',
  },
  {
    id: 'preset-4',
    title: 'Mock Technical Interview',
    prompt: 'Conduct a mock technical interview for a React 19 and TypeScript developer role. Ask 5 targeted questions.',
    category: 'Interview Prep',
    icon: 'Sparkles',
  },
];
