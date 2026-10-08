import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-cobalt text-white hover:bg-cobalt-dark',
  secondary: 'bg-white text-ink border border-line hover:border-ink/30 hover:bg-mist',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
  ghost: 'text-cobalt hover:bg-cobalt-tint',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

export const buttonClasses = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
}: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean } = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap',
    'transition-colors duration-200 active:translate-y-px',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
  );
