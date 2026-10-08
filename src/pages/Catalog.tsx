import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyMap } from '../components/property/PropertyMap';
import { CatalogFilters } from '../components/search/CatalogFilters';
import { ButtonAnchor } from '../components/ui/Button';
import { Select } from '../components/ui/Field';
import { Container } from '../components/ui/Layout';
import { Pagination } from '../components/ui/Pagination';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { WhatsAppIcon } from '../components/ui/icons';
import { whatsappUrl } from '../config/site';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import type { SortKey } from '../lib/catalog';

const PAGE_SIZE = 8;
const SORT_KEYS: SortKey[] = ['recent', 'price-asc', 'price-desc'];

export const Catalog = () => {
  const { t } = useTranslation();
  const { filters, results, page, update, reset, isFiltered } = useCatalogFilters();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const alertLink = whatsappUrl(t('catalog.alertMessage'));

  const changePage = (next: number) => {
    update({ page: next });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <title>{`${t(`catalog.title_${filters.type}`)} — CK Immobilier`}</title>

      <Container className="pt-8 pb-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t(`catalog.title_${filters.type}`)}
            </h1>
            <p className="mt-1 text-muted" aria-live="polite">
              {t('catalog.results', { count: results.length })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="catalog-sort">
              {t('catalog.sortLabel')}
            </label>
            <Select
              id="catalog-sort"
              className="h-10 w-48 text-sm"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
            >
              {SORT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`catalog.sort_${key}`)}
                </option>
              ))}
            </Select>
            <SegmentedControl
              label={t('catalog.viewLabel')}
              size="sm"
              className="lg:hidden"
              options={[
                { value: 'list' as const, label: t('catalog.viewList') },
                { value: 'map' as const, label: t('catalog.viewMap') },
              ]}
              value={view}
              onChange={setView}
            />
          </div>
        </div>
      </Container>

      <div className="sticky top-[72px] z-20 border-y border-line bg-white/95 backdrop-blur">
        <Container className="py-3">
          <CatalogFilters filters={filters} onChange={update} onReset={reset} isFiltered={isFiltered} />
        </Container>
      </div>

      <Container className="grid gap-8 py-8 lg:grid-cols-12">
        <div className={view === 'map' ? 'hidden lg:col-span-7 lg:block' : 'lg:col-span-7'}>
          {visible.length > 0 ? (
            <>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                {visible.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    highlighted={hoveredId === property.id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
              <div className="mt-12 space-y-8">
                <Pagination page={currentPage} totalPages={totalPages} onChange={changePage} />
                <p className="rounded-xl bg-mist p-5 text-[15px] text-ink">
                  {t('catalog.notFoundHint')}{' '}
                  <a href={alertLink} target="_blank" rel="noopener noreferrer" className="font-medium text-cobalt hover:underline">
                    {t('catalog.emptyCta')}
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-mist px-6 py-12 sm:px-10">
              <h2 className="text-xl font-semibold text-ink">{t('catalog.emptyTitle')}</h2>
              <p className="mt-2 max-w-[60ch] text-muted">{t('catalog.emptyText')}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonAnchor href={alertLink} variant="whatsapp" icon={<WhatsAppIcon className="size-4" />}>
                  {t('catalog.emptyCta')}
                </ButtonAnchor>
                <button
                  type="button"
                  onClick={reset}
                  className="h-11 rounded-lg px-4 text-[15px] font-medium text-cobalt hover:bg-cobalt-tint"
                >
                  {t('catalog.reset')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={view === 'map' ? 'lg:col-span-5' : 'hidden lg:col-span-5 lg:block'}>
          <div className="lg:sticky lg:top-[152px]">
            <PropertyMap
              properties={results}
              activeId={hoveredId}
              scrollZoom
              className="h-[70dvh] lg:h-[calc(100dvh-184px)]"
            />
          </div>
        </div>
      </Container>
    </>
  );
};
