import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  variant?: 'brand' | 'accent' | 'emerald';
  className?: string;
}

const variantStyles = {
  brand: 'bg-gradient-to-r from-indigo-500 to-purple-600',
  accent: 'bg-gradient-to-r from-purple-500 to-pink-600',
  emerald: 'bg-gradient-to-r from-emerald-500 to-teal-500',
};

/**
 * Reusable ProgressBar component for quiz completion and skill metrics.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  variant = 'brand',
  className,
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-mono font-medium text-muted-foreground">
          {label && <span>{label}</span>}
          {showPercentage && <span>{Math.round(normalizedProgress)}%</span>}
        </div>
      )}
      <div className="h-2.5 w-full bg-card/80 border border-border/40 rounded-full overflow-hidden p-0.5">
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', variantStyles[variant])}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};
