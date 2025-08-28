import { icons, type LucideProps } from 'lucide-react';
import * as React from 'react';

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export { Icon };

