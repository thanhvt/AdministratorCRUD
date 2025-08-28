import { ShieldCheck } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
        SecureBank
      </h1>
    </div>
  );
};

