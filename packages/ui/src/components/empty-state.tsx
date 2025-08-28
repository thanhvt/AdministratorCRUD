import * as React from 'react';
import { Icon } from './icon';
import { cn } from '../lib/utils';

interface EmptyStateProps {
  iconName: string;
  title: string;
  description: string;
  className?: string;
}

export const EmptyState = ({ iconName, title, description, className }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12', className)}>
      <div className="bg-secondary rounded-full p-4 mb-4">
        <Icon name={iconName} className="h-8 w-8 text-secondary-foreground" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-xs">{description}</p>
    </div>
  );
};

