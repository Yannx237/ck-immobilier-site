import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { CITIES, LISTING_TYPES, type City, type ListingType } from '../../data/properties';
import { BUDGET_STEPS, type CatalogFilters as Filters } from '../../lib/catalog';
import { formatAmount } from '../../lib/format';
import { Select, TextInput } from '../ui/Field';
import { SegmentedControl } from '../ui/SegmentedControl';

interface CatalogFiltersProps {
  filters: Filters;
  onChange: (changes: Partial<Filters>) => void;
  onReset: () => void;
  isFiltered: boolean;
}

export const CatalogFilters = ({ filters, onChange, onReset, isFiltered }: CatalogFiltersProps) => {
  const { t } = useTranslation();
  const budgetSteps = filters.type === 'ALL' ? [] : BUDGET_STEPS[filters.type];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <SegmentedControl
        label={t('catalog.typeLabel')}
        size="sm"
        className="lg:w-auto"
        options={[
          { value: 'ALL' as const, label: t('catalog.all') },
          ...LISTING_TYPES.map((value) => ({ value, label: t(`search.${value}`) })),
        ]}
        value={filters.type}
        onChange={(type: ListingType | 'ALL') => onChange({ type, maxPrice: null })}
      />

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <label className="sr-only" htmlFor="filter-city">
          {t('search.city')}
        </label>
        <Select
          id="filter-city"
          className="h-10 text-sm sm:w-44"
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value as City | 'ALL' })}
        >
          <option value="ALL">{t('search.allCities')}</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <label className="sr-only" htmlFor="filter-budget">
          {t('search.budget')}
        </label>
        <Select
          id="filter-budget"
          className="h-10 text-sm sm:w-48"
          value={filters.maxPrice ?? ''}
          disabled={budgetSteps.length === 0}
          onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : null })}
        >
          <option value="">{t('search.budget')}</option>
          {budgetSteps.map((step) => (
            <option key={step} value={step}>
              ≤ {formatAmount(step)} FCFA
            </option>
          ))}
        </Select>

        <div className="relative col-span-2 sm:w-56">
          <label className="sr-only" htmlFor="filter-query">
            {t('catalog.searchLabel')}
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" strokeWidth={1.75} />
          <TextInput
            id="filter-query"
            type="search"
            className="h-10 pl-9 text-sm"
            placeholder={t('catalog.searchPlaceholder')}
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={filters.exclusiveOnly}
          onChange={(e) => onChange({ exclusiveOnly: e.target.checked })}
          className="size-4 accent-cobalt"
        />
        {t('catalog.exclusive')}
      </label>

      {isFiltered && (
        <button type="button" onClick={onReset} className="text-left text-sm font-medium text-cobalt hover:underline lg:ml-auto">
          {t('catalog.reset')}
        </button>
      )}
    </div>
  );
};
