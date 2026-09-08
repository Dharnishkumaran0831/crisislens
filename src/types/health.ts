/**
 * System Health and Telemetry Metrics Data Models
 */

export type ServiceStatus = 'operational' | 'degraded' | 'maintenance' | 'offline';

export interface ServiceHealth {
  serviceName: string;
  status: ServiceStatus;
  latencyMs: number;
  uptimePercentage: number;
  lastChecked: string;
}

export interface SystemMetrics {
  status: ServiceStatus;
  version: string;
  environment: string;
  services: ServiceHealth[];
}
