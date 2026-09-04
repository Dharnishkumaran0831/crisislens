/**
 * AI Chat and Career Counseling Session Data Models
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  tokensUsed?: number;
}

export interface ChatSession {
  sessionId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface PromptPreset {
  id: string;
  title: string;
  prompt: string;
  category: 'Career Guidance' | 'Skill Assessment' | 'Resume Review' | 'Interview Prep';
  icon?: string;
}
