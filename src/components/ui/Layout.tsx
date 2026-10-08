import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>
);

interface SectionProps {
  tone?: 'white' | 'mist';
  className?: string;
  containerClassName?: string;
  id?: string;
  children: ReactNode;
}

export const Section = ({ tone = 'white', className, containerClassName, id, children }: SectionProps) => (
  <section id={id} className={cn('py-16 sm:py-20', tone === 'mist' && 'bg-mist', className)}>
    <Container className={containerClassName}>{children}</Container>
  </section>
);

interface SectionHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

export const SectionHeader = ({ title, description, action, as: Heading = 'h2', className }: SectionHeaderProps) => (
  <div className={cn('mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
    <div className="max-w-2xl">
      <Heading
        className={cn(
          'font-semibold tracking-tight text-ink text-balance',
          Heading === 'h1' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]',
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-2 text-muted">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
