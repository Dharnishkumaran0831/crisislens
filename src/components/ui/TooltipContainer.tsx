import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface TooltipContainerProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const positionStyles = {
  top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
};

/**
 * Lightweight hover Tooltip wrapper component.
 */
export const TooltipContainer: React.FC<TooltipContainerProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-40 px-2.5 py-1 text-xs font-medium text-foreground bg-popover/90 border border-border/80 rounded-lg shadow-md whitespace-nowrap pointer-events-none backdrop-blur-sm animate-fadeIn',
            positionStyles[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
