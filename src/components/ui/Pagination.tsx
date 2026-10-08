import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const arrow = 'flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium text-ink hover:bg-mist disabled:opacity-40';

  return (
    <nav aria-label={t('catalog.pagination')} className="flex items-center justify-center gap-1">
      <button type="button" className={arrow} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="size-4" strokeWidth={1.75} />
        {t('catalog.previous')}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
          className={cn(
            'size-10 rounded-lg text-sm font-medium tabular-nums',
            n === page ? 'bg-cobalt text-white' : 'text-ink hover:bg-mist',
          )}
        >
          {n}
        </button>
      ))}
      <button type="button" className={arrow} disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        {t('catalog.next')}
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </button>
    </nav>
  );
};
