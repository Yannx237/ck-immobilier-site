import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { CITIES, LISTING_TYPES, properties, type City, type ListingType } from '../../data/properties';
import { BUDGET_STEPS, DEFAULT_FILTERS, filterProperties } from '../../lib/catalog';
import { formatAmount } from '../../lib/format';
import { Button } from '../ui/Button';
import { Field, Select } from '../ui/Field';
import { SegmentedControl } from '../ui/SegmentedControl';

/** Recherche rapide de l'accueil : renvoie vers le catalogue filtré. */
export const SearchPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [type, setType] = useState<ListingType>('RENT');
  const [city, setCity] = useState<City | 'ALL'>('ALL');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const count = filterProperties(properties, { ...DEFAULT_FILTERS, type, city, maxPrice }).length;

  const changeType = (next: ListingType) => {
    setType(next);
    setMaxPrice(null); // les paliers de budget dépendent du type
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ type });
    if (city !== 'ALL') params.set('city', city);
    if (maxPrice) params.set('max', String(maxPrice));
    navigate(`/catalogue?${params}`);
  };

  return (
    <form onSubmit={submit} className="rounded-xl bg-white p-4 shadow-soft ring-1 ring-line sm:p-5">
      <SegmentedControl
        label={t('search.label')}
        options={LISTING_TYPES.map((value) => ({ value, label: t(`search.${value}`) }))}
        value={type}
        onChange={changeType}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field id="search-city" label={t('search.city')}>
          <Select id="search-city" value={city} onChange={(e) => setCity(e.target.value as City | 'ALL')}>
            <option value="ALL">{t('search.allCities')}</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="search-budget" label={t('search.budget')}>
          <Select
            id="search-budget"
            value={maxPrice ?? ''}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">{t('search.anyBudget')}</option>
            {BUDGET_STEPS[type].map((step) => (
              <option key={step} value={step}>
                {formatAmount(step)} FCFA{t(`price.${type}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={count === 0}
        className="mt-4"
        icon={<Search className="size-4" strokeWidth={2} />}
      >
        {t('search.submit', { count })}
      </Button>
    </form>
  );
};
