import { SystemMetrics } from '../types/health';

export const SYSTEM_HEALTH_METRICS: SystemMetrics = {
  status: 'operational',
  version: '1.4.0',
  environment: 'production',
  services: [
    {
      serviceName: 'React Frontend App',
      status: 'operational',
      latencyMs: 12,
      uptimePercentage: 99.98,
      lastChecked: new Date().toISOString(),
    },
    {
      serviceName: 'Supabase Auth & Database',
      status: 'operational',
      latencyMs: 45,
      uptimePercentage: 99.95,
      lastChecked: new Date().toISOString(),
    },
    {
      serviceName: 'Gemini AI Gateway API',
      status: 'operational',
      latencyMs: 120,
      uptimePercentage: 99.90,
      lastChecked: new Date().toISOString(),
    },
    {
      serviceName: 'Vercel Edge Network',
      status: 'operational',
      latencyMs: 18,
      uptimePercentage: 99.99,
      lastChecked: new Date().toISOString(),
    },
  ],
};
