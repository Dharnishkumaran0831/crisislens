import { UserPreferences, UserProfile } from '../types/user';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-001',
  fullName: 'Dharnishkumaran R',
  email: 'dharnishkumaranrdk@gmail.com',
  bio: 'B.Tech Information Technology student & Full-Stack AI Engineer',
  targetRole: 'Full-Stack Developer / AI Applications Engineer',
  skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Supabase', 'Python'],
  githubHandle: 'Dharnishkumaran0831',
  linkedinHandle: 'dharnishkumaran-r-019986322',
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'dark',
  emailNotifications: true,
  aiModelPreference: 'gemini-3.6-flash',
  autoSaveRoadmap: true,
};
