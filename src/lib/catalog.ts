import type { City, ListingType, Property } from '../data/properties';

export type SortKey = 'recent' | 'price-asc' | 'price-desc';

export interface CatalogFilters {
  type: ListingType | 'ALL';
  city: City | 'ALL';
  maxPrice: number | null;
  query: string;
  exclusiveOnly: boolean;
  sort: SortKey;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  type: 'ALL',
  city: 'ALL',
  maxPrice: null,
  query: '',
  exclusiveOnly: false,
  sort: 'recent',
};

// Paliers de budget proposés selon le type de bien (en FCFA).
export const BUDGET_STEPS: Record<ListingType, number[]> = {
  SALE: [50_000_000, 100_000_000, 200_000_000, 400_000_000],
  RENT: [100_000, 200_000, 300_000, 500_000],
  NIGHT: [5_000, 10_000, 15_000],
};

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const filterProperties = (items: Property[], filters: CatalogFilters) => {
  const query = normalize(filters.query.trim());

  const filtered = items.filter(
    (item) =>
      (filters.type === 'ALL' || item.listingType === filters.type) &&
      (filters.city === 'ALL' || item.city === filters.city) &&
      (filters.maxPrice === null || item.price <= filters.maxPrice) &&
      (!filters.exclusiveOnly || item.isExclusive) &&
      (!query ||
        normalize(`${item.title} ${item.district} ${item.city} ${item.category}`).includes(query)),
  );

  if (filters.sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
};

export const countByCity = (items: Property[]) =>
  items.reduce<Partial<Record<City, number>>>((acc, item) => {
    acc[item.city] = (acc[item.city] ?? 0) + 1;
    return acc;
  }, {});
