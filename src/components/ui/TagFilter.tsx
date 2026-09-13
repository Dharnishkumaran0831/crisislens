import React from 'react';
import { cn } from '../../lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  className?: string;
}

/**
 * Reusable horizontal TagFilter component for category selection.
 */
export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTag,
  onSelectTag,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {tags.map((tag) => {
        const isSelected = selectedTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={cn(
              'px-4 py-2 text-xs font-mono font-bold rounded-2xl border transition-all cursor-pointer',
              isSelected
                ? 'bg-gradient-brand text-white border-transparent shadow-md'
                : 'glass border-border/80 text-muted-foreground hover:text-foreground hover:border-indigo-500/50'
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};
