/**
 * Technical Interview Preparation and Feedback Data Models
 */

export type InterviewDifficulty = 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';

export interface InterviewQuestion {
  id: string;
  topic: string;
  question: string;
  sampleAnswer: string;
  keyPointsToCover: string[];
  difficulty: InterviewDifficulty;
  category: 'System Design' | 'Frontend Architecture' | 'Backend & Databases' | 'Behavioral';
}

export interface InterviewFeedback {
  sessionDate: string;
  topic: string;
  overallScore: number; // 0 to 100
  strengths: string[];
  areasForImprovement: string[];
  recommendedTopics: string[];
}
