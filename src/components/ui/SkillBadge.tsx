import React from 'react';
import { cn } from '../../lib/utils';

interface SkillBadgeProps {
  label: string;
  variant?: 'brand' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  brand: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  accent: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  outline: 'bg-card/60 text-muted-foreground border-border/80',
};

const sizeStyles = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

/**
 * Reusable pill badge component for technical skills and feature tags.
 */
export const SkillBadge: React.FC<SkillBadgeProps> = ({
  label,
  variant = 'brand',
  size = 'sm',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium font-mono rounded-full border backdrop-blur-sm transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
};
