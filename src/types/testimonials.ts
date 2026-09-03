/**
 * Testimonial and Career Roadmap Data Models
 */

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  content: string;
  rating: number; // 1 to 5
}

export interface RoadmapItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  skillsCovered: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  estimatedDuration: string;
}
