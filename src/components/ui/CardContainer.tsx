import React from 'react';
import { cn } from '../../lib/utils';

interface CardContainerProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'interactive';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  glass: 'glass border border-border/50 bg-card/70',
  solid: 'bg-card border border-border shadow-sm',
  interactive: 'glass border border-border/50 bg-card/70 hover:border-indigo-500/50 hover:bg-card/90 transition-all cursor-pointer hover:shadow-lg',
};

/**
 * Reusable Card container component with customizable surface styles.
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  variant = 'glass',
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn('rounded-3xl p-6 shadow-card', variantStyles[variant], className)}
    >
      {children}
    </div>
  );
};
