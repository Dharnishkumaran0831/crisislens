/**
 * Portfolio Data Models & Type Definitions
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'AI / ML' | 'Web App' | 'Blockchain' | 'Mobile';
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 1 to 100
    iconName?: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
