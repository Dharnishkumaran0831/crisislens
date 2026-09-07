/**
 * User Profile and Preferences Data Models
 */

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  targetRole?: string;
  skills: string[];
  githubHandle?: string;
  linkedinHandle?: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  emailNotifications: boolean;
  aiModelPreference: 'gemini-3.6-flash' | 'gemini-3.6-pro';
  autoSaveRoadmap: boolean;
}
