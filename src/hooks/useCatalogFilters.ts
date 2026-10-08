import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CITIES, LISTING_TYPES, properties, type City, type ListingType } from '../data/properties';
import { DEFAULT_FILTERS, filterProperties, type CatalogFilters, type SortKey } from '../lib/catalog';

const SORT_KEYS: SortKey[] = ['recent', 'price-asc', 'price-desc'];

const pick = <T extends string>(value: string | null, allowed: readonly T[], fallback: T) =>
  allowed.includes(value as T) ? (value as T) : fallback;

/**
 * Les filtres du catalogue vivent dans l'URL : la page est partageable,
 * le bouton retour fonctionne, et aucun état n'est dupliqué.
 */
export const useCatalogFilters = () => {
  const [params, setParams] = useSearchParams();

  const filters: CatalogFilters = useMemo(() => {
    const max = Number(params.get('max'));
    return {
      type: pick<ListingType | 'ALL'>(params.get('type'), ['ALL', ...LISTING_TYPES], 'ALL'),
      city: pick<City | 'ALL'>(params.get('city'), ['ALL', ...CITIES], 'ALL'),
      maxPrice: max > 0 ? max : null,
      query: params.get('q') ?? '',
      exclusiveOnly: params.get('exclusive') === '1',
      sort: pick(params.get('sort'), SORT_KEYS, 'recent'),
    };
  }, [params]);

  const page = Math.max(1, Number(params.get('page')) || 1);
  const results = useMemo(() => filterProperties(properties, filters), [filters]);

  const update = (changes: Partial<CatalogFilters> & { page?: number }) => {
    const next = { ...filters, ...changes };
    const search = new URLSearchParams();
    if (next.type !== 'ALL') search.set('type', next.type);
    if (next.city !== 'ALL') search.set('city', next.city);
    if (next.maxPrice) search.set('max', String(next.maxPrice));
    if (next.query.trim()) search.set('q', next.query);
    if (next.exclusiveOnly) search.set('exclusive', '1');
    if (next.sort !== 'recent') search.set('sort', next.sort);
    // Changer un filtre ramène toujours à la première page.
    if (changes.page && changes.page > 1) search.set('page', String(changes.page));
    setParams(search, { replace: true });
  };

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  const isFiltered = JSON.stringify({ ...filters, sort: 'recent' }) !== JSON.stringify(DEFAULT_FILTERS);

  return { filters, results, page, update, reset, isFiltered };
};
