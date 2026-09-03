import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

/**
 * Reusable animated Loading Spinner UI component.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-indigo-400', sizeClasses[size], className)} />
      {label && <span className="text-sm font-medium text-muted-foreground">{label}</span>}
    </div>
  );
};
