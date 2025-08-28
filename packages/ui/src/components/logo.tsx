import * as React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
}

export const Logo = ({ className, isCollapsed = false }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-2 font-semibold', className)}>
      <ShieldCheck className="h-7 w-7 text-primary transition-all duration-300" />
      {!isCollapsed && (
        <span className="text-xl transition-opacity duration-300">SecureBank</span>
      )}
    </div>
  );
};

