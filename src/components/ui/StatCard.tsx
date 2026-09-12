import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: string;
  className?: string;
}

/**
 * Reusable StatCard component for displaying key portfolio and skill telemetry statistics.
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        'glass border border-border/50 rounded-3xl p-6 space-y-3 shadow-card hover:border-indigo-500/40 transition-colors',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        {Icon && (
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h4 className="text-3xl font-bold font-display tracking-tight text-foreground">{value}</h4>
        {trend && <span className="text-xs font-mono font-medium text-emerald-400">{trend}</span>}
      </div>

      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};
