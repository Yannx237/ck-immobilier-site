import type { TFunction } from 'i18next';
import type { Property } from '../data/properties';
import { formatAmount } from './format';

export const locationLabel = (property: Property) => `${property.district}, ${property.city}`;

export const priceLabel = (property: Property, t: TFunction) =>
  `${formatAmount(property.price)} FCFA${t(`price.${property.listingType}`)}`;

/** Ligne de caractéristiques courte affichée sous le titre d'une annonce. */
export const specLine = (property: Property, t: TFunction) => {
  const parts =
    property.listingType === 'NIGHT'
      ? []
      : [
          t('specs.surface', { value: property.surface }),
          t('specs.bedrooms', { count: property.bedrooms }),
          t('specs.bathrooms', { count: property.bathrooms }),
        ];
  return [...parts, ...property.highlights].join(' · ');
};

export const propertyMessage = (property: Property, t: TFunction, key: 'whatsappMessage' | 'visitMessage') =>
  t(`property.${key}`, {
    title: property.title,
    location: locationLabel(property),
    price: priceLabel(property, t),
    ref: `CK-${property.id.padStart(3, '0')}`,
  });
