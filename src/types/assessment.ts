/**
 * Career Skill Assessment and Quiz Data Models
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI Integration';
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  passed: boolean;
  categoryScores: Record<string, number>;
  completedAt: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}
