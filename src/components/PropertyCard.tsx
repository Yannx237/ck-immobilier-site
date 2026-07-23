import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Maximize2, Bed, MapPin, ArrowRight, Key, Home } from 'lucide-react';
import type { PropertyWithMap } from '../data/properties';
import { useTranslation } from 'react-i18next';

interface PropertyCardProps {
  property: PropertyWithMap;
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index = 0 }) => {
  const { t } = useTranslation();
  const isRent = property.listingType === 'RENT';

  const delayClass = index % 3 === 1 ? 'delay-100' : index % 3 === 2 ? 'delay-200' : '';

  return (
    <div className={`reveal-on-scroll ${delayClass} group relative overflow-hidden bg-[#1a1c1c] rounded-xl border border-[#4d4635]/40 hover:border-[#f2ca50]/70 transition-all duration-500 shadow-xl flex flex-col h-full hover:-translate-y-1`}>
      
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-[#0c0f0f]">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/20 to-transparent"></div>

        {/* Badge VENTE / LOCATION */}
        <div className="absolute top-3 left-3 z-10">
          <div
            className={`px-2.5 py-1 rounded text-[10px] font-['Hanken_Grotesk'] font-bold tracking-widest flex items-center gap-1 shadow-md ${
              isRent
                ? 'bg-[#00311f]/90 text-[#68dba9] border border-[#68dba9]/40 backdrop-blur'
                : 'bg-[#3c2f00]/90 text-[#f2ca50] border border-[#f2ca50]/40 backdrop-blur'
            }`}
          >
            {isRent ? <Key className="w-3 h-3 text-[#68dba9]" /> : <Home className="w-3 h-3 text-[#f2ca50]" />}
            <span>{isRent ? t('search.rent') : t('search.buy')}</span>
          </div>
        </div>

        {/* Badge DIRECT CK */}
        {property.isDirectCk && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[#0c0f0f]/90 backdrop-blur px-2.5 py-1 border border-[#f2ca50]/40 rounded-full shadow-lg">
            <ShieldCheck className="w-3 h-3 text-[#f2ca50]" />
            <span className="font-['Hanken_Grotesk'] text-[9px] font-bold text-[#f2ca50] tracking-widest">
              DIRECT CK
            </span>
          </div>
        )}

        {/* Category tag bottom left of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="bg-[#121414]/80 backdrop-blur px-2 py-0.5 rounded text-[9px] font-['Hanken_Grotesk'] font-bold tracking-wider text-[#d0c5af] border border-[#4d4635]/40">
            {property.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1 text-[#f2ca50] text-[11px] font-['Hanken_Grotesk'] font-bold tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.location.toUpperCase()} — {property.city.toUpperCase()}</span>
          </div>

          <h3 className="font-['Playfair_Display'] font-semibold text-lg text-[#e2e2e2] group-hover:text-[#f2ca50] transition-colors mb-3 line-clamp-1">
            {property.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-[#d0c5af] font-['Manrope'] mb-4 pb-4 border-b border-[#4d4635]/30">
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>{property.surface} {t('property.surface')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>{property.bedrooms} {t('property.bedrooms')}</span>
            </div>
          </div>
        </div>

        {/* Price and Link */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block text-[9px] font-['Hanken_Grotesk'] tracking-widest text-[#99907c]">
              {isRent ? t('property.monthlyRent') : t('property.propertyValue')}
            </span>
            <span className={`font-['Playfair_Display'] font-bold text-base sm:text-lg ${isRent ? 'text-[#68dba9]' : 'text-[#f2ca50]'}`}>
              {property.price}
            </span>
          </div>

          <Link
            to={`/property/${property.id}`}
            aria-label={`${t('property.viewProperty')} ${property.title}`}
            className="w-9 h-9 rounded-full bg-[#1e2020] border border-[#4d4635] flex items-center justify-center text-[#f2ca50] group-hover:bg-[#f2ca50] group-hover:text-[#3c2f00] transition-all shadow-md shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};
