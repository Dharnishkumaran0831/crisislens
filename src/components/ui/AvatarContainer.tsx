import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarContainerProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

/**
 * Reusable AvatarContainer component displaying profile images or fallback initials.
 */
export const AvatarContainer: React.FC<AvatarContainerProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const getInitials = (str: string) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden border border-border/80 bg-gradient-brand text-white font-bold font-display shadow-sm flex-shrink-0',
        sizeStyles[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
