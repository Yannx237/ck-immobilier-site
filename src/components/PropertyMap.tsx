import React, { useState, useEffect, useRef } from 'react';
import type { PropertyWithMap } from '../data/properties';
import { Search, Maximize2, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

declare const mapboxgl: any;

interface PropertyMapProps {
  properties: PropertyWithMap[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (id: string) => void;
}

const MAPBOX_ACCESS_TOKEN =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  atob('cGsuZXlKMUlqb2lZMmhsY21sNFlYQndJaXdpWVNJNkltTnRiSHBvY21oa01qQTFibVV6WkhGMmFXd3laVEl4TUhraWZRLl9HOG00b1pzSmlpY21pT19LRFIxS1E=');

// Helper to format map badge prices concisely (e.g. 350M FCFA or 450k/mo)
const formatMapPrice = (priceStr: string, isRent: boolean): string => {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  if (num >= 1_000_000) {
    const millions = (num / 1_000_000).toLocaleString('fr-FR');
    return isRent ? `${millions}M FCFA/mo` : `${millions}M FCFA`;
  } else if (num >= 1_000) {
    const thousands = (num / 1_000).toLocaleString('fr-FR');
    return isRent ? `${thousands}k FCFA/mo` : `${thousands}k FCFA`;
  }
  return priceStr;
};

const houseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
`;

const keySvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="7.5" cy="15.5" r="5.5"/>
  <path d="m21 2-9.6 9.6"/>
  <path d="m15.5 7.5 3 3"/>
</svg>
`;

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
}) => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});

  const [mapSearchText, setMapSearchText] = useState<string>('');
  const [mapModeFilter, setMapModeFilter] = useState<'ALL' | 'ACHETER' | 'LOUER'>('ALL');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Filter properties in real time
  const displayedProperties = properties.filter((prop) => {
    const matchesSearch =
      !mapSearchText.trim() ||
      prop.title.toLowerCase().includes(mapSearchText.toLowerCase()) ||
      prop.location.toLowerCase().includes(mapSearchText.toLowerCase()) ||
      prop.city.toLowerCase().includes(mapSearchText.toLowerCase());

    const matchesMode =
      mapModeFilter === 'ALL' ||
      (mapModeFilter === 'ACHETER' && prop.listingType === 'SALE') ||
      (mapModeFilter === 'LOUER' && prop.listingType === 'RENT');

    return matchesSearch && matchesMode;
  });

  const selectedProp = displayedProperties.find((p) => p.id === selectedPropertyId) || displayedProperties[0] || properties[0];
  const defaultCenter: [number, number] = selectedProp
    ? [selectedProp.mapCoordinates.lng, selectedProp.mapCoordinates.lat]
    : [9.6894, 4.0435]; // [lng, lat] for Mapbox GL JS

  // Lock body scroll when full screen map is active
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    if (mapRef.current) {
      setTimeout(() => mapRef.current.resize(), 300);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullScreen]);

  // Initialize Mapbox GL JS map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof mapboxgl === 'undefined') return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: defaultCenter,
      zoom: 11,
      pitch: 30, // Subtle luxury 3D pitch perspective
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers on Mapbox GL Map
  useEffect(() => {
    if (!mapRef.current || typeof mapboxgl === 'undefined') return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    displayedProperties.forEach((prop) => {
      const isSelected = selectedPropertyId === prop.id;
      const isRent = prop.listingType === 'RENT';
      const tagLabel = isRent ? 'LOC' : 'ACHAT';
      const shortPriceStr = formatMapPrice(prop.price, isRent);

      const primaryBg = isRent ? '#25a475' : '#d4af37';
      const borderCol = isSelected ? '#ffffff' : isRent ? '#68dba9' : '#f2ca50';
      const iconColor = isSelected ? '#ffffff' : isRent ? '#00311f' : '#3c2f00';

      // Create Custom Element
      const el = document.createElement('div');
      el.className = 'cursor-pointer group';
      el.style.transform = 'translate(-50%, -100%)';
      el.innerHTML = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          ${
            prop.isDirectCk
              ? `<div style="position: absolute; inset: -6px; background: ${isRent ? 'rgba(104,219,169,0.35)' : 'rgba(242,202,80,0.35)'}; filter: blur(6px); border-radius: 9999px;"></div>`
              : ''
          }
          
          <div style="
            width: ${isSelected ? '42px' : '36px'};
            height: ${isSelected ? '42px' : '36px'};
            border-radius: 9999px;
            background: ${primaryBg};
            border: 2px solid ${borderCol};
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${iconColor};
            box-shadow: 0 0 ${isSelected ? '22px' : '12px'} ${isRent ? 'rgba(37,164,117,0.7)' : 'rgba(242,202,80,0.7)'};
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
          ">
            ${isRent ? keySvg : houseSvg}
          </div>

          <div style="
            margin-top: 4px;
            background: rgba(18, 20, 20, 0.95);
            border: 1px solid ${borderCol};
            padding: 2px 8px;
            border-radius: 6px;
            font-family: 'Hanken Grotesk', sans-serif;
            font-size: 10px;
            font-weight: 800;
            color: ${isRent ? '#68dba9' : '#f2ca50'};
            letter-spacing: 0.05em;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="opacity: 0.8; font-size: 9px; font-weight: 700; border-right: 1px solid rgba(255,255,255,0.2); padding-right: 4px;">${tagLabel}</span>
            <span>${shortPriceStr}</span>
          </div>
        </div>
      `;

      el.addEventListener('click', () => {
        if (onSelectProperty) onSelectProperty(prop.id);
      });

      // Create Popup HTML
      const popupHtml = `
        <div style="padding: 6px; width: 220px; font-family: 'Manrope', sans-serif; color: #e2e2e2;">
          <div style="position: relative; height: 100px; border-radius: 8px; overflow: hidden; background: #0c0f0f; margin-bottom: 8px;">
            <img src="${prop.imageUrl}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            <span style="position: absolute; top: 6px; left: 6px; background: ${isRent ? '#00311f' : '#3c2f00'}; color: ${isRent ? '#68dba9' : '#f2ca50'}; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
              ${isRent ? 'LOCATION' : 'ACHAT'}
            </span>
          </div>
          <span style="font-size: 9px; font-weight: 800; color: #f2ca50; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">
            ${prop.location.toUpperCase()} — ${prop.city.toUpperCase()}
          </span>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700; color: #e2e2e2; margin: 0 0 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${prop.title}
          </h4>
          <p style="font-size: 11px; color: #d0c5af; margin: 0 0 8px 0;">
            ${prop.surface} m² • ${prop.bedrooms} Chambres
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(77,70,53,0.4); padding-top: 6px;">
            <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 13px; color: ${isRent ? '#68dba9' : '#f2ca50'};">
              ${prop.price}
            </span>
            <a href="/property/${prop.id}" style="background: #f2ca50; color: #3c2f00; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; text-decoration: none;">
              VOIR →
            </a>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: [0, -36], closeButton: false }).setHTML(popupHtml);

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([prop.mapCoordinates.lng, prop.mapCoordinates.lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      markersRef.current[prop.id] = marker;
    });
  }, [displayedProperties, selectedPropertyId]);

  // Recenter Mapbox map when selectedPropertyId changes
  useEffect(() => {
    if (!mapRef.current || !selectedProp) return;
    mapRef.current.flyTo({
      center: [selectedProp.mapCoordinates.lng, selectedProp.mapCoordinates.lat],
      zoom: 12.5,
      essential: true,
    });
  }, [selectedPropertyId]);

  return (
    <div className={`transition-all duration-300 overflow-hidden bg-[#121414] ${
      isFullScreen
        ? 'fixed inset-0 z-[9999] w-full h-full rounded-none border-none'
        : 'relative w-full h-full min-h-[480px] sm:min-h-[600px] rounded-xl border border-[#4d4635]/40 shadow-2xl'
    }`}>
      
      {/* Floating In-Map Search Bar & Fullscreen Controls Overlay (Visible ONLY on Mobile) */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex sm:hidden items-center gap-2 bg-[#1a1c1c]/95 backdrop-blur-md p-2 rounded-xl border border-[#f2ca50]/40 shadow-2xl">
        
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#f2ca50] w-3.5 h-3.5" />
          <input
            type="text"
            value={mapSearchText}
            onChange={(e) => setMapSearchText(e.target.value)}
            placeholder={t('map.searchInMap')}
            className="w-full bg-[#121414] border border-[#4d4635]/40 rounded-lg pl-7 pr-2 py-1.5 text-xs text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none font-['Manrope']"
          />
        </div>

        {/* Quick Mode Filters */}
        <div className="flex items-center gap-1 shrink-0">
          {(['ALL', 'ACHETER', 'LOUER'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMapModeFilter(mode)}
              className={`text-[9px] font-['Hanken_Grotesk'] font-bold px-2 py-1.5 rounded transition-all cursor-pointer ${
                mapModeFilter === mode
                  ? 'bg-[#f2ca50] text-[#3c2f00]'
                  : 'bg-[#121414] text-[#d0c5af] border border-[#4d4635]/30'
              }`}
            >
              {mode === 'ALL' ? t('map.all') : mode === 'ACHETER' ? t('map.sale') : t('map.rent')}
            </button>
          ))}
        </div>

        {/* Fullscreen Toggle Button */}
        <button
          type="button"
          onClick={() => setIsFullScreen(!isFullScreen)}
          aria-label={isFullScreen ? t('map.reduce') : t('map.fullscreen')}
          className="p-2 bg-[#f2ca50] text-[#3c2f00] rounded-lg shrink-0 shadow-lg cursor-pointer font-bold flex items-center justify-center active:scale-95 transition-transform"
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

      </div>

      {/* Desktop Fullscreen Button */}
      <div className="absolute top-4 right-4 z-[1000] hidden sm:block">
        <button
          type="button"
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="flex items-center gap-2 bg-[#1a1c1c]/90 backdrop-blur-md px-3.5 py-2 border border-[#f2ca50]/40 text-[#f2ca50] rounded-lg text-xs font-['Hanken_Grotesk'] font-bold hover:bg-[#f2ca50] hover:text-[#3c2f00] transition-colors shadow-lg cursor-pointer"
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span>{isFullScreen ? t('map.reduce') : t('map.fullscreen')}</span>
        </button>
      </div>

      {/* Mapbox GL Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

    </div>
  );
};
