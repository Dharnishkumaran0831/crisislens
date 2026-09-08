import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionContainerProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

/**
 * Reusable expandable AccordionContainer component.
 */
export const AccordionContainer: React.FC<AccordionContainerProps> = ({
  items,
  defaultOpenId,
  className,
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="glass border border-border/60 rounded-2xl overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left text-foreground font-semibold text-base hover:bg-card/40 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-200',
                  isOpen && 'transform rotate-180 text-indigo-400'
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-muted-foreground border-t border-border/30 pt-3 animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
