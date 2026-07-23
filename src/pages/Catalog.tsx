import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { sampleProperties, type PropertyWithMap } from '../data/properties';
import { Search, Filter, ShieldCheck, LayoutGrid, Map as MapIcon, ArrowRight, DollarSign, RotateCcw, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Helper function to extract numeric price from price string
const parsePrice = (priceStr: string): number => {
  const digitsOnly = priceStr.replace(/[^0-9]/g, '');
  return parseInt(digitsOnly, 10) || 0;
};

const ITEMS_PER_PAGE = 6;

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  // Read URL query params
  const paramMode = searchParams.get('mode'); // 'ACHETER' | 'LOUER'
  const paramSearch = searchParams.get('search') || '';
  const paramMinPrice = searchParams.get('minPrice') || '';
  const paramMaxPrice = searchParams.get('maxPrice') || '';
  const paramDirectCk = searchParams.get('directCk') === 'true';
  const paramCity = searchParams.get('city') || 'ALL';

  const [selectedMode, setSelectedMode] = useState<'ALL' | 'ACHETER' | 'LOUER'>(
    paramMode === 'LOUER' ? 'LOUER' : paramMode === 'ACHETER' ? 'ACHETER' : 'ALL'
  );
  const [selectedCity, setSelectedCity] = useState<string>(paramCity);
  const [searchQuery, setSearchQuery] = useState<string>(paramSearch);
  const [minPriceInput, setMinPriceInput] = useState<string>(paramMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState<string>(paramMaxPrice);
  const [onlyDirectCk, setOnlyDirectCk] = useState<boolean>(paramDirectCk);
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state if URL search parameters change
  useEffect(() => {
    if (paramMode === 'LOUER') setSelectedMode('LOUER');
    else if (paramMode === 'ACHETER') setSelectedMode('ACHETER');
    
    if (paramSearch) setSearchQuery(paramSearch);
    if (paramMinPrice) setMinPriceInput(paramMinPrice);
    if (paramMaxPrice) setMaxPriceInput(paramMaxPrice);
    if (paramDirectCk) setOnlyDirectCk(true);
    if (paramCity) setSelectedCity(paramCity);
  }, [paramMode, paramSearch, paramMinPrice, paramMaxPrice, paramDirectCk, paramCity]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMode, selectedCity, searchQuery, minPriceInput, maxPriceInput, onlyDirectCk]);

  const handleResetFilters = () => {
    setSelectedMode('ALL');
    setSelectedCity('ALL');
    setSearchQuery('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setOnlyDirectCk(false);
    setCurrentPage(1);
  };

  const filteredProperties: PropertyWithMap[] = sampleProperties.filter((item) => {
    const matchesMode =
      selectedMode === 'ALL' ||
      (selectedMode === 'ACHETER' && item.listingType === 'SALE') ||
      (selectedMode === 'LOUER' && item.listingType === 'RENT');

    const matchesCity = selectedCity === 'ALL' || item.city.toUpperCase() === selectedCity;

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const itemPrice = parsePrice(item.price);
    const minVal = minPriceInput ? parseInt(minPriceInput, 10) : 0;
    const maxVal = maxPriceInput ? parseInt(maxPriceInput, 10) : Infinity;

    const matchesPriceRange = itemPrice >= minVal && itemPrice <= maxVal;
    const matchesDirectCk = !onlyDirectCk || item.isDirectCk;

    return matchesMode && matchesCity && matchesSearch && matchesPriceRange && matchesDirectCk;
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isFilterActive =
    selectedMode !== 'ALL' ||
    selectedCity !== 'ALL' ||
    searchQuery !== '' ||
    minPriceInput !== '' ||
    maxPriceInput !== '' ||
    onlyDirectCk;

  return (
    <div className="pt-24 pb-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Clean 2-Row Header & Filter Controls Bar */}
      <div className="glass-panel p-5 md:p-6 rounded-xl space-y-5 shadow-xl">
        
        {/* Row 1: Title & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#4d4635]/30 pb-4">
          <div>
            <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-[0.2em] block">
              {t('catalog.subtitle')}
            </span>
            <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#e2e2e2]">
              {t('catalog.title')}
            </h1>
          </div>

          {/* View Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#1a1c1c] rounded-lg border border-[#4d4635]/40 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('MAP')}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-['Hanken_Grotesk'] font-bold tracking-wider transition-all cursor-pointer ${
                viewMode === 'MAP'
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                  : 'text-[#d0c5af] hover:text-[#f2ca50]'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>{t('search.viewMap')}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('GRID')}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-['Hanken_Grotesk'] font-bold tracking-wider transition-all cursor-pointer ${
                viewMode === 'GRID'
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                  : 'text-[#d0c5af] hover:text-[#f2ca50]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t('search.viewGrid')}</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Input, Price Range, and Filter Pills (Hidden on Mobile when in MAP view) */}
        <div className={`flex flex-col lg:flex-row flex-wrap items-center gap-4 ${viewMode === 'MAP' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f2ca50] w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-9 py-2.5 text-xs font-['Manrope'] text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none"
            />
          </div>

          {/* Price Range Inputs */}
          <div className="flex items-center gap-2 bg-[#1a1c1c] border border-[#4d4635]/50 px-3 py-2 rounded text-xs w-full sm:w-auto">
            <DollarSign className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
            <input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              placeholder={t('search.minPrice')}
              className="w-24 bg-transparent text-xs text-[#e2e2e2] placeholder-[#99907c] focus:outline-none font-['Manrope']"
            />
            <span className="text-[#99907c]">-</span>
            <input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder={t('search.maxPrice')}
              className="w-24 bg-transparent text-xs text-[#e2e2e2] placeholder-[#99907c] focus:outline-none font-['Manrope']"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <Filter className="w-4 h-4 text-[#f2ca50]" />
              {(['ALL', 'ACHETER', 'LOUER'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMode(m)}
                  className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3.5 py-2 rounded transition-all cursor-pointer ${
                    selectedMode === m
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                      : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/50'
                  }`}
                >
                  {m === 'ALL' ? t('catalog.allTypes') : m === 'ACHETER' ? t('catalog.buy') : t('catalog.rent')}
                </button>
              ))}
            </div>

            <span className="text-[#4d4635] font-bold hidden sm:inline">|</span>

            {/* City Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              {['ALL', 'DOUALA', 'YAOUNDÉ'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3.5 py-2 rounded transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                      : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/50'
                  }`}
                >
                  {city === 'ALL' ? t('catalog.cities') : city}
                </button>
              ))}
            </div>

            {/* Direct CK Toggle */}
            <button
              type="button"
              onClick={() => setOnlyDirectCk(!onlyDirectCk)}
              className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3.5 py-2 rounded transition-all border cursor-pointer shrink-0 ${
                onlyDirectCk
                  ? 'border-[#f2ca50] bg-[#f2ca50]/20 text-[#f2ca50]'
                  : 'border-[#4d4635]/50 bg-[#1a1c1c] text-[#99907c]'
              }`}
            >
              {t('catalog.directCk')}
            </button>
          </div>

        </div>

        {/* Dynamic Results Counter & Reset Bar */}
        <div className={`flex flex-wrap items-center justify-between pt-3 border-t border-[#4d4635]/30 text-xs font-['Hanken_Grotesk'] ${viewMode === 'MAP' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30 px-3 py-1 rounded-full font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
              {filteredProperties.length} {filteredProperties.length > 1 ? t('catalog.propertiesFound') : t('catalog.propertyFound')}
            </span>
          </div>

          {isFilterActive && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer font-bold tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('catalog.resetFilters')}</span>
            </button>
          )}
        </div>

      </div>

      {/* Main Content Area */}
      {viewMode === 'MAP' ? (
        /* MAP VIEW: Full Height on Mobile + Hidden Cards on Mobile */
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)] min-h-[500px] lg:h-[720px] w-full overflow-hidden">
          
          {/* Sidebar Property Cards List (Visible ONLY on Desktop in Map View) */}
          <div className="hidden lg:flex w-full lg:w-[460px] h-full overflow-y-auto pr-2 flex-col justify-between shrink-0 custom-scrollbar">
            <div className="space-y-4">
              {paginatedProperties.length > 0 ? (
                paginatedProperties.map((prop) => {
                  const isSelected = selectedPropertyId === prop.id;
                  return (
                    <div
                      key={prop.id}
                      onClick={() => setSelectedPropertyId(prop.id)}
                      className={`bg-[#1a1c1c] rounded-xl border p-4 transition-all duration-300 cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'border-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.25)] bg-[#1e2020]'
                          : 'border-[#4d4635]/30 hover:border-[#f2ca50]/50'
                      }`}
                    >
                      <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0 relative bg-[#0c0f0f]">
                        <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover" />
                        {prop.isDirectCk && (
                          <span className="absolute top-1 left-1 bg-[#121414]/90 text-[#f2ca50] border border-[#f2ca50]/30 text-[8px] font-['Hanken_Grotesk'] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <ShieldCheck className="w-2.5 h-2.5 text-[#f2ca50]" /> CK
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-['Hanken_Grotesk'] text-[#f2ca50] font-bold tracking-wider">
                              {prop.location.toUpperCase()} — {prop.city.toUpperCase()}
                            </span>
                            <span className={`text-[9px] font-['Hanken_Grotesk'] font-bold px-1.5 py-0.5 rounded ${
                              prop.listingType === 'SALE' ? 'bg-[#f2ca50]/20 text-[#f2ca50]' : 'bg-[#68dba9]/20 text-[#68dba9]'
                            }`}>
                              {prop.listingType === 'SALE' ? t('catalog.buy') : t('catalog.rent')}
                            </span>
                          </div>
                          <h3 className="font-['Playfair_Display'] font-semibold text-base text-[#e2e2e2] line-clamp-1">
                            {prop.title}
                          </h3>
                          <p className="text-xs text-[#d0c5af] font-['Manrope'] mt-1">
                            {prop.surface} {t('property.surface')} • {prop.bedrooms} {t('property.bedrooms')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#4d4635]/20">
                          <span className="font-['Playfair_Display'] font-bold text-sm text-[#f2ca50]">
                            {prop.price}
                          </span>
                          <Link
                            to={`/property/${prop.id}`}
                            className="text-[#f2ca50] hover:text-[#ffe088] p-1 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-[#1a1c1c] rounded-xl border border-[#4d4635]/30 space-y-3">
                  <p className="font-['Playfair_Display'] text-sm text-[#d0c5af]">
                    {t('catalog.noProperties')}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline"
                  >
                    {t('catalog.resetFilters')}
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Pagination */}
            {totalPages > 1 && (
              <div className="pt-4 border-t border-[#4d4635]/30 flex items-center justify-between text-xs font-['Hanken_Grotesk']">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 bg-[#1a1c1c] border border-[#4d4635]/50 rounded text-[#e2e2e2] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#f2ca50] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[#d0c5af] font-bold">
                  {t('search.page')} {currentPage} {t('search.of')} {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-1.5 bg-[#1a1c1c] border border-[#4d4635]/50 rounded text-[#e2e2e2] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#f2ca50] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Map Area (Takes Full Width & Height of parent container) */}
          <div className="flex-grow w-full h-full min-w-0">
            <PropertyMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(id) => setSelectedPropertyId(id)}
            />
          </div>

        </div>
      ) : (
        /* Grid View: Standard 3-column responsive grid for mobile & desktop */
        <div className="space-y-8">
          {paginatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1a1c1c] rounded-xl border border-[#4d4635]/30 space-y-3">
              <p className="font-['Playfair_Display'] text-xl text-[#d0c5af]">
                {t('catalog.noProperties')}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline"
              >
                {t('catalog.resetFilters')}
              </button>
            </div>
          )}

          {/* Grid View Main Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-[#4d4635]/40 text-xs font-['Hanken_Grotesk']">
              <span className="text-[#99907c]">
                {t('catalog.showing')} {startIndex + 1} {t('catalog.to')} {Math.min(startIndex + ITEMS_PER_PAGE, filteredProperties.length)} {t('catalog.of')} {filteredProperties.length} {t('catalog.properties')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="flex items-center gap-1 px-3 py-2 bg-[#1a1c1c] border border-[#4d4635]/50 rounded-lg text-[#e2e2e2] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#f2ca50] transition-colors font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t('search.previous')}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md scale-105'
                          : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/40'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="flex items-center gap-1 px-3 py-2 bg-[#1a1c1c] border border-[#4d4635]/50 rounded-lg text-[#e2e2e2] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#f2ca50] transition-colors font-bold cursor-pointer"
                >
                  <span>{t('search.next')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
