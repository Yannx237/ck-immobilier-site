import { useTranslation } from 'react-i18next';
import { Bath, BedDouble, CalendarDays, Car, LandPlot, Ruler } from 'lucide-react';
import type { Property } from '../../data/properties';
import { formatAmount } from '../../lib/format';

export const PropertyFacts = ({ property }: { property: Property }) => {
  const { t } = useTranslation();

  const facts = [
    { icon: Ruler, label: t('property.surface'), value: `${formatAmount(property.surface)} m²` },
    property.listingType !== 'NIGHT' && { icon: BedDouble, label: t('property.bedrooms'), value: property.bedrooms },
    property.listingType !== 'NIGHT' && { icon: Bath, label: t('property.bathrooms'), value: property.bathrooms },
    property.garages && { icon: Car, label: t('property.garages'), value: property.garages },
    property.landSurface && { icon: LandPlot, label: t('property.land'), value: `${formatAmount(property.landSurface)} m²` },
    property.yearBuilt && { icon: CalendarDays, label: t('property.yearBuilt'), value: property.yearBuilt },
  ].filter(Boolean) as { icon: typeof Ruler; label: string; value: string | number }[];

  return (
    <dl aria-label={t('property.facts')} className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {facts.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 bg-white p-4">
          <Icon className="size-5 shrink-0 text-cobalt" strokeWidth={1.75} />
          <div>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="font-medium text-ink tabular-nums">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
};
