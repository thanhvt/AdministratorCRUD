import * as React from 'react';
import { type Icon as LucideIcon } from 'lucide-react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const [LucideIcon, setLucideIcon] = React.useState<LucideIcon | null>(null);

  React.useEffect(() => {
    import('lucide-react')
      .then(lucide => {
        setLucideIcon(lucide[name as keyof typeof lucide] as LucideIcon);
      })
      .catch(err => {
        console.error(`Failed to load icon: ${name}`, err);
      });
  }, [name]);

  if (!LucideIcon) {
    return <div style={{ width: props.size, height: props.size }} />;
  }

  return <LucideIcon {...props} />;
};

export { Icon };

