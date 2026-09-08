import React from 'react';
import { ServiceStatus } from '../../types/health';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: ServiceStatus;
  label?: string;
  className?: string;
}

const statusStyles = {
  operational: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  maintenance: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  offline: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const statusDotStyles = {
  operational: 'bg-emerald-400',
  degraded: 'bg-amber-400',
  maintenance: 'bg-indigo-400',
  offline: 'bg-red-400',
};

/**
 * Service status indicator badge component with pulsing dot animation.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium rounded-full border backdrop-blur-sm',
        statusStyles[status],
        className
      )}
    >
      <span className={cn('h-2 w-2 rounded-full animate-pulse', statusDotStyles[status])} />
      {label || status.toUpperCase()}
    </span>
  );
};
