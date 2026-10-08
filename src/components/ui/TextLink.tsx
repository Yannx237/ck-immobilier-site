import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

interface TextLinkProps {
  /** Route interne, ou URL externe si elle commence par http. */
  to: string;
  direction?: 'forward' | 'back';
  className?: string;
  children: ReactNode;
}

/** Lien texte bleu avec flèche, pour les actions secondaires. */
export const TextLink = ({ to, direction = 'forward', className, children }: TextLinkProps) => {
  const classes = cn('inline-flex items-center gap-1.5 text-[15px] font-medium text-cobalt hover:underline', className);
  const Arrow = direction === 'back' ? ArrowLeft : ArrowRight;
  const content =
    direction === 'back' ? (
      <>
        <Arrow className="size-4" strokeWidth={1.75} />
        {children}
      </>
    ) : (
      <>
        {children}
        <Arrow className="size-4" strokeWidth={1.75} />
      </>
    );

  return to.startsWith('http') ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
};
