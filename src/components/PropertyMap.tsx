import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { PropertyWithMap } from '../data/properties';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

interface PropertyMapProps {
  properties: PropertyWithMap[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (id: string) => void;
}

// SVG House Icon String (Achat / Vente)
const houseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
`;

// SVG Key Icon String (Location)
const keySvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="7.5" cy="15.5" r="5.5"/>
  <path d="m21 2-9.6 9.6"/>
  <path d="m15.5 7.5 3 3"/>
</svg>
`;

// Custom Leaflet DivIcon with House/Key SVG Icons & Color Coding (Achat vs Location)
const createCustomMarkerIcon = (
  price: string,
  listingType: 'SALE' | 'RENT',
  isDirectCk: boolean,
  isSelected: boolean
) => {
  const isRent = listingType === 'RENT';
  const tagLabel = isRent ? 'LOC' : 'ACHAT';
  
  // Format short price (e.g. 3.4B FCFA or 4.5M/mo)
  const pricePart = price.split(' ')[0];
  const shortPriceStr = isRent ? `${pricePart} FCFA/mo` : `${pricePart} FCFA`;

  // Color tokens
  const primaryBg = isRent ? '#25a475' : '#d4af37'; // Emerald Green for RENT, Prestige Gold for SALE
  const borderCol = isSelected ? '#ffffff' : isRent ? '#68dba9' : '#f2ca50';
  const iconColor = isSelected ? '#ffffff' : isRent ? '#00311f' : '#3c2f00';

  return L.divIcon({
    className: 'custom-property-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
        ${
          isDirectCk
            ? `<div style="position: absolute; inset: -5px; background: ${isRent ? 'rgba(104,219,169,0.35)' : 'rgba(242,202,80,0.35)'}; filter: blur(6px); border-radius: 9999px;"></div>`
            : ''
        }
        
        <div style="
          width: ${isSelected ? '40px' : '34px'};
          height: ${isSelected ? '40px' : '34px'};
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
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
  });

};

// Map recenter helper
const MapRecenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], Math.max(map.getZoom(), 12), { animate: true });
  }, [lat, lng, map]);
  return null;
};

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
}) => {
  const selectedProp = properties.find((p) => p.id === selectedPropertyId) || properties[0];
  const defaultCenter: [number, number] = selectedProp
    ? [selectedProp.mapCoordinates.lat, selectedProp.mapCoordinates.lng]
    : [4.0435, 9.6894];

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-xl border border-[#4d4635]/40 shadow-2xl">
      
      {/* Header Legend Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-[#1a1c1c]/90 backdrop-blur-md px-4 py-2 border border-[#f2ca50]/30 rounded-full shadow-lg pointer-events-none">
        <MapPin className="w-4 h-4 text-[#f2ca50]" />
        <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#e2e2e2] tracking-wider">
          CARTE INTERACTIVE
        </span>
        <div className="h-3 w-[1px] bg-[#4d4635]"></div>
        <div className="flex items-center gap-3 text-[10px] font-['Hanken_Grotesk'] font-bold">
          <span className="flex items-center gap-1 text-[#f2ca50]">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span> ACHAT
          </span>
          <span className="flex items-center gap-1 text-[#68dba9]">
            <span className="w-2 h-2 rounded-full bg-[#68dba9]"></span> LOCATION
          </span>
        </div>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {selectedProp && (
          <MapRecenter
            lat={selectedProp.mapCoordinates.lat}
            lng={selectedProp.mapCoordinates.lng}
          />
        )}

        {properties.map((prop) => {
          const isSelected = selectedPropertyId === prop.id;
          const isRent = prop.listingType === 'RENT';
          const customIcon = createCustomMarkerIcon(
            prop.price,
            prop.listingType,
            !!prop.isDirectCk,
            isSelected
          );

          return (
            <Marker
              key={prop.id}
              position={[prop.mapCoordinates.lat, prop.mapCoordinates.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => onSelectProperty && onSelectProperty(prop.id),
              }}
            >
              <Popup>
                <div className="w-64 p-3 space-y-2">
                  <div className="relative h-28 rounded-lg overflow-hidden bg-[#0c0f0f]">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Badge Achat/Location in Popup */}
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span
                        className={`text-[9px] font-['Hanken_Grotesk'] font-bold px-2 py-0.5 rounded shadow ${
                          isRent ? 'bg-[#00311f] text-[#68dba9]' : 'bg-[#3c2f00] text-[#f2ca50]'
                        }`}
                      >
                        {isRent ? 'LOCATION' : 'ACHAT'}
                      </span>
                    </div>

                    {prop.isDirectCk && (
                      <span className="absolute top-2 right-2 bg-[#121414]/90 text-[#f2ca50] border border-[#f2ca50]/40 text-[9px] font-['Hanken_Grotesk'] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                        <ShieldCheck className="w-3 h-3 text-[#f2ca50]" /> DIRECT CK
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-['Hanken_Grotesk'] font-bold text-[#f2ca50] tracking-wider block">
                      {prop.location.toUpperCase()} — {prop.city.toUpperCase()}
                    </span>
                    <h4 className="font-['Playfair_Display'] font-semibold text-sm text-[#e2e2e2] line-clamp-1">
                      {prop.title}
                    </h4>
                    <p className="text-xs text-[#d0c5af] font-['Manrope'] mt-0.5">
                      {prop.surface} m² • {prop.bedrooms} Chambres
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#4d4635]/40">
                    <span
                      className={`font-['Playfair_Display'] font-bold text-sm ${
                        isRent ? 'text-[#68dba9]' : 'text-[#f2ca50]'
                      }`}
                    >
                      {prop.price}
                    </span>
                    <Link
                      to={`/property/${prop.id}`}
                      className="bg-[#f2ca50] text-[#3c2f00] p-1.5 rounded hover:bg-[#ffe088] transition-colors inline-flex items-center justify-center"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

    </div>
  );
};
