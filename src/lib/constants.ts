/**
 * Global Application Constants and Default Timeouts
 */

export const APP_NAME = 'CareerPilot AI';
export const APP_VERSION = '1.5.0';

export const API_TIMEOUT_MS = 15000;
export const MAX_FILE_UPLOAD_MB = 10;

export const SUPPORTED_RESUME_FORMATS = ['.pdf'];

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;
