import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface TagProps {
  tone?: 'default' | 'accent' | 'onPhoto';
  className?: string;
  children: ReactNode;
}

const TONES = {
  default: 'bg-white text-ink border border-line',
  accent: 'bg-cobalt-tint text-cobalt',
  onPhoto: 'bg-white/95 text-ink shadow-sm',
};

export const Tag = ({ tone = 'default', className, children }: TagProps) => (
  <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium', TONES[tone], className)}>
    {children}
  </span>
);
