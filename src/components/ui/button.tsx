import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[#84ba3f] text-white hover:bg-[#6ea032]',
  secondary: 'bg-[#006600] text-white hover:bg-[#004d00]',
  outline:
    'border-2 border-[#84ba3f] text-[#84ba3f] hover:bg-[#84ba3f] hover:text-white',
};

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
