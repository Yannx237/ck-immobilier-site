import { useTranslation } from 'react-i18next';
import type { Property } from '../../data/properties';
import { cn } from '../../lib/cn';
import { formatAmount } from '../../lib/format';

const SIZES = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export const Price = ({ property, size = 'md' }: { property: Property; size?: keyof typeof SIZES }) => {
  const { t } = useTranslation();
  return (
    <p className={cn('font-semibold tracking-tight text-ink tabular-nums', SIZES[size])}>
      {formatAmount(property.price)}
      <span className="ml-1 text-[0.6em] font-normal text-muted">
        FCFA{t(`price.${property.listingType}`)}
      </span>
    </p>
  );
};
