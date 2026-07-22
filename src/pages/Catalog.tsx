import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { sampleProperties, type PropertyWithMap } from '../data/properties';
import { Search, Filter, ShieldCheck, LayoutGrid, Map as MapIcon, ArrowRight, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Helper function to extract numeric price from price string (e.g. "350 000 000 FCFA" -> 350000000)
const parsePrice = (priceStr: string): number => {
  const digitsOnly = priceStr.replace(/[^0-9]/g, '');
  return parseInt(digitsOnly, 10) || 0;
};

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

  const filteredProperties: PropertyWithMap[] = sampleProperties.filter((item) => {
    // Mode filter (ACHETER -> SALE, LOUER -> RENT)
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

  return (
    <div className="pt-24 pb-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header & Filter Controls Bar */}
      <div className="glass-panel p-5 md:p-6 rounded-xl space-y-4 shadow-xl">
        
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Title & View Switcher */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-6">
            <div>
              <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-[0.2em] block">
                PORTFOLIO PATRIMOINE CK
              </span>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
                Catalogue & Carte Interactive
              </h1>
            </div>

            {/* View Switcher Buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#1a1c1c] rounded-lg border border-[#4d4635]/40 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('MAP')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-['Hanken_Grotesk'] font-bold tracking-wider transition-all ${
                  viewMode === 'MAP'
                    ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                    : 'text-[#d0c5af] hover:text-[#f2ca50]'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t('search.viewMap')}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('GRID')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-['Hanken_Grotesk'] font-bold tracking-wider transition-all ${
                  viewMode === 'GRID'
                    ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                    : 'text-[#d0c5af] hover:text-[#f2ca50]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">{t('search.viewGrid')}</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f2ca50] w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par titre, quartier..."
              className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-9 py-2.5 text-xs font-['Manrope'] text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none"
            />
          </div>

          {/* Price Range Inputs on Catalog Header */}
          <div className="flex items-center gap-1.5 bg-[#1a1c1c] border border-[#4d4635]/50 px-2.5 py-1.5 rounded text-xs">
            <DollarSign className="w-3.5 h-3.5 text-[#f2ca50]" />
            <input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              placeholder="Min FCFA"
              className="w-20 bg-transparent text-xs text-[#e2e2e2] placeholder-[#99907c] focus:outline-none font-['Manrope']"
            />
            <span className="text-[#99907c]">-</span>
            <input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder="Max FCFA"
              className="w-20 bg-transparent text-xs text-[#e2e2e2] placeholder-[#99907c] focus:outline-none font-['Manrope']"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            <Filter className="w-4 h-4 text-[#f2ca50] shrink-0" />
            
            {/* Mode Pills: TOUS / ACHAT / LOCATION */}
            {(['ALL', 'ACHETER', 'LOUER'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMode(m)}
                className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3 py-1.5 rounded transition-all shrink-0 ${
                  selectedMode === m
                    ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                    : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/50'
                }`}
              >
                {m === 'ALL' ? 'TOUS TYPES' : m === 'ACHETER' ? 'ACHAT' : 'LOCATION'}
              </button>
            ))}

            <span className="text-[#4d4635] font-bold">|</span>

            {/* City Pills */}
            {['ALL', 'DOUALA', 'YAOUNDÉ'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3 py-1.5 rounded transition-all shrink-0 ${
                  selectedCity === city
                    ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                    : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/50'
                }`}
              >
                {city === 'ALL' ? 'VILLES' : city}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setOnlyDirectCk(!onlyDirectCk)}
              className={`font-['Hanken_Grotesk'] text-[11px] font-bold tracking-wider px-3 py-1.5 rounded transition-all shrink-0 border ${
                onlyDirectCk
                  ? 'border-[#f2ca50] bg-[#f2ca50]/20 text-[#f2ca50]'
                  : 'border-[#4d4635]/50 bg-[#1a1c1c] text-[#99907c]'
              }`}
            >
              DIRECT CK
            </button>
          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {viewMode === 'MAP' ? (
        /* Split View: List on left + Interactive Map on right */
        <div className="flex flex-col lg:flex-row gap-6 h-[720px] overflow-hidden">
          
          {/* Scrollable Sidebar Property List */}
          <div className="w-full lg:w-[460px] h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => {
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
                            {prop.listingType === 'SALE' ? 'ACHAT' : 'LOCATION'}
                          </span>
                        </div>
                        <h3 className="font-['Playfair_Display'] font-semibold text-base text-[#e2e2e2] line-clamp-1">
                          {prop.title}
                        </h3>
                        <p className="text-xs text-[#d0c5af] font-['Manrope'] mt-1">
                          {prop.surface} m² • {prop.bedrooms} Chambres
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
              <div className="text-center py-12 bg-[#1a1c1c] rounded-xl border border-[#4d4635]/30">
                <p className="font-['Playfair_Display'] text-sm text-[#d0c5af]">
                  Aucun bien ne correspond à la fourchette de prix spécifiée.
                </p>
              </div>
            )}
          </div>

          {/* Map Area */}
          <div className="flex-grow h-full">
            <PropertyMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(id) => setSelectedPropertyId(id)}
            />
          </div>

        </div>
      ) : (
        /* Grid View: Standard 3-column responsive grid */
        <div className="space-y-6">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1a1c1c] rounded-xl border border-[#4d4635]/30">
              <p className="font-['Playfair_Display'] text-xl text-[#d0c5af]">
                Aucun bien ne correspond à votre tranche de budget actuelle.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
