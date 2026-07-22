import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleProperties, type PropertyWithMap } from '../data/properties';
import { PropertyMap } from '../components/PropertyMap';
import { ShieldCheck, MapPin, Maximize2, Bed, ArrowLeft, Phone, Calendar, Check, Clock, Home, Compass, Image as ImageIcon } from 'lucide-react';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property: PropertyWithMap = sampleProperties.find((p) => p.id === id) || sampleProperties[0];
  
  // Active selected image state for gallery carousel
  const gallery = property.galleryImages || [property.imageUrl];
  const [activeImage, setActiveImage] = useState<string>(gallery[0]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETOUR AU CATALOGUE & CARTE</span>
        </Link>
      </div>

      {/* Main Grid: Gallery & Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Photo Gallery & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Active Photo Container */}
          <div className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden border border-[#4d4635]/40 shadow-2xl bg-[#0c0f0f] group">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Badge Direct CK */}
            {property.isDirectCk && (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#0c0f0f]/90 backdrop-blur px-4 py-2 border border-[#f2ca50]/40 rounded-full shadow-lg z-10">
                <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-widest">
                  MANDAT DIRECT CK
                </span>
              </div>
            )}

            {/* Photo Counter Badge */}
            <div className="absolute bottom-4 right-4 bg-[#121414]/85 backdrop-blur px-3 py-1.5 rounded-lg border border-[#4d4635]/50 flex items-center gap-2 text-xs font-['Hanken_Grotesk'] font-bold text-[#e2e2e2] z-10">
              <ImageIcon className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>{gallery.indexOf(activeImage) + 1} / {gallery.length} PHOTOS</span>
            </div>
          </div>

          {/* Interactive Thumbnails Grid */}
          <div className="space-y-2">
            <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-[0.2em] block">
              GALERIE PHOTO HD ({gallery.length} VUES)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {gallery.map((imgUrl, index) => {
                const isSelected = activeImage === imgUrl;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                      isSelected
                        ? 'border-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.4)] scale-95'
                        : 'border-[#4d4635]/40 opacity-70 hover:opacity-100 hover:border-[#f2ca50]/60'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${property.title} Vue ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#f2ca50]/10 pointer-events-none"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title & Location */}
          <div className="space-y-3 border-b border-[#4d4635]/30 pb-6 pt-4">
            <div className="flex items-center gap-2 text-[#f2ca50] font-['Hanken_Grotesk'] text-xs font-bold tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>{property.location.toUpperCase()} — {property.city.toUpperCase()}</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2]">
              {property.title}
            </h1>
            <p className="font-['Hanken_Grotesk'] text-xs text-[#99907c] tracking-widest">
              RÉFÉRENCE : CK-PRESTIGE-{property.id}092
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#1a1c1c] rounded-xl border border-[#4d4635]/30 text-center">
            <div>
              <span className="block text-xs font-['Hanken_Grotesk'] text-[#99907c] tracking-widest">SURFACE</span>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#f2ca50] flex items-center justify-center gap-1 mt-1">
                <Maximize2 className="w-4 h-4" /> {property.surface} m²
              </span>
            </div>
            <div className="border-l border-[#4d4635]/30">
              <span className="block text-xs font-['Hanken_Grotesk'] text-[#99907c] tracking-widest">CHAMBRES</span>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#f2ca50] flex items-center justify-center gap-1 mt-1">
                <Bed className="w-4 h-4" /> {property.bedrooms}
              </span>
            </div>
            <div className="border-l border-[#4d4635]/30">
              <span className="block text-xs font-['Hanken_Grotesk'] text-[#99907c] tracking-widest">SBA / GARAGE</span>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#f2ca50] flex items-center justify-center gap-1 mt-1">
                <Home className="w-4 h-4" /> {property.details.bathrooms} SDB
              </span>
            </div>
            <div className="border-l border-[#4d4635]/30">
              <span className="block text-xs font-['Hanken_Grotesk'] text-[#99907c] tracking-widest">ANNEE</span>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#f2ca50] flex items-center justify-center gap-1 mt-1">
                <Clock className="w-4 h-4" /> {property.details.yearBuilt}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#e2e2e2]">
              Description de la Propriété
            </h3>
            <p className="font-['Manrope'] text-base text-[#d0c5af] leading-relaxed">
              Une résidence d'exception pensée pour les exigences de la haute société. Offrant des volumes magistraux, une luminosité traversante et des finitions en marbre d'importation, ce bien incarne le sommet du raffinement immobilier à {property.city}.
            </p>
            <p className="font-['Manrope'] text-base text-[#d0c5af] leading-relaxed">
              Le domaine comprend une suite parentale avec dressing sur-mesure, une cuisine équipée haut de gamme, une piscine à débordement privée ainsi qu'un système de sécurité domotique intégrale.
            </p>
          </div>

          {/* Map Location Section */}
          <div className="space-y-4 pt-4 border-t border-[#4d4635]/30">
            <div className="flex items-center justify-between">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#e2e2e2] flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#f2ca50]" />
                <span>Emplacement & Géolocalisation Privée</span>
              </h3>
              <span className="font-['Hanken_Grotesk'] text-xs text-[#f2ca50] font-bold tracking-wider">
                {property.location}, {property.city}
              </span>
            </div>

            <div className="h-96 rounded-xl overflow-hidden border border-[#4d4635]/40 shadow-xl">
              <PropertyMap
                properties={[property]}
                selectedPropertyId={property.id}
              />
            </div>
          </div>

          {/* Prestation / Equipments */}
          <div className="space-y-4 pt-4 border-t border-[#4d4635]/30">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#e2e2e2]">
              Prestations & Équipements de Luxe
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#d0c5af] font-['Manrope']">
              {[
                'Piscine chauffée à débordement',
                'Sécurité gardiennage & Vidéosurveillance 24/7',
                'Groupe électrogène industriel autonome',
                'Forage d\'eau avec système de purification',
                'Domotique & Climatisation centrale VRV',
                'Garage couvert pour 4 véhicules de luxe',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-[#1a1c1c] p-3 rounded border border-[#4d4635]/30">
                  <Check className="w-4 h-4 text-[#f2ca50] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Price & Appointment Box */}
        <div className="space-y-6">
          
          <div className="glass-panel p-8 rounded-2xl space-y-6 sticky top-28 border border-[#f2ca50]/30 shadow-2xl">
            
            <div>
              <span className="block text-xs font-['Hanken_Grotesk'] text-[#99907c] tracking-widest mb-1">
                {property.listingType === 'RENT' ? 'LOYER MENSUEL' : 'PRIX PROPOSÉ AU MANDAT'}
              </span>
              <span className="font-['Playfair_Display'] font-bold text-3xl text-[#f2ca50]">
                {property.price}
              </span>
            </div>

            <div className="border-t border-[#4d4635]/30 pt-6 space-y-4">
              <h4 className="font-['Playfair_Display'] font-semibold text-lg text-[#e2e2e2]">
                Solliciter une Visite Privée
              </h4>
              <p className="text-xs text-[#d0c5af] font-['Manrope']">
                Nos courtiers seniors vous accompagnent pour une présentation exclusive et confidentielle sur place.
              </p>

              <form className="space-y-3 pt-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Votre Nom & Prénom"
                  className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Téléphone / WhatsApp (+237)"
                  className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none"
                />
                <input
                  type="date"
                  className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-widest py-3.5 rounded shadow-[0_0_15px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Calendar className="w-4 h-4" />
                  <span>RÉSERVER LA VISITE PRIVÉE</span>
                </button>
              </form>

              <div className="pt-4 text-center">
                <a
                  href="https://wa.me/237678386875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-['Hanken_Grotesk'] text-[#f2ca50] hover:underline tracking-wider font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CONTACT DIRECT : +237 678 38 68 75 / +237 656 24 20 81</span>
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
