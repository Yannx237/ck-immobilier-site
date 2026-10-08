import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Property } from '../../data/properties';
import { cn } from '../../lib/cn';
import { locationLabel, specLine } from '../../lib/property';
import { Tag } from '../ui/Tag';
import { Price } from './Price';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured';
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
  className?: string;
}

export const PropertyCard = ({ property, variant = 'default', highlighted, onHover, className }: PropertyCardProps) => {
  const { t } = useTranslation();
  const featured = variant === 'featured';

  return (
    <article
      className={cn('group', className)}
      onMouseEnter={onHover && (() => onHover(property.id))}
      onMouseLeave={onHover && (() => onHover(null))}
    >
      <Link to={`/property/${property.id}`} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">
        <div
          className={cn(
            'relative overflow-hidden rounded-xl bg-mist shadow-soft transition-shadow',
            featured ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[4/3]',
            highlighted && 'ring-2 ring-cobalt',
          )}
        >
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Tag tone="onPhoto">{t(`listing.${property.listingType}`)}</Tag>
          </div>
          {property.images.length > 1 && (
            <span className="absolute right-3 bottom-3 rounded-md bg-ink/75 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
              {t('specs.photoCount', { index: 1, count: property.images.length })}
            </span>
          )}
        </div>

        <div className={cn('pt-3', featured && 'sm:pt-4')}>
          <Price property={property} size={featured ? 'lg' : 'md'} />
          <h3 className={cn('mt-1 font-medium text-ink', featured ? 'text-lg' : 'text-[15px]')}>{property.title}</h3>
          <p className="text-sm text-muted">{locationLabel(property)}</p>
          <p className="mt-1 text-sm text-muted/90">{specLine(property, t)}</p>
        </div>
      </Link>
    </article>
  );
};
