import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleProperties } from '../data/properties';
import { ShieldCheck, MapPin, BedDouble, Bath, Maximize2, Phone, Calendar, ArrowLeft, Check, MessageCircle, X, Send, CheckCircle2, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PropertyMap } from '../components/PropertyMap';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const property = sampleProperties.find((p) => p.id === id);

  // Gallery Active Image state
  const gallery: string[] = property?.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : property ? [property.imageUrl] : [];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [visitSubmitted, setVisitSubmitted] = useState<boolean>(false);

  if (!property) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center space-y-6">
        <h1 className="font-['Playfair_Display'] text-3xl text-[#e2e2e2]">{t('property.notFound')}</h1>
        <p className="font-['Manrope'] text-sm text-[#d0c5af]">{t('property.notFoundDesc')}</p>
        <Link to="/catalogue" className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline">
          <ArrowLeft className="w-4 h-4" /> {t('property.returnCatalog')}
        </Link>
      </div>
    );
  }

  const bathroomsCount = property.details?.bathrooms || 3;
  const descriptionText = property.description || `Cette propriété d'exception située à ${property.location} (${property.city}) offre un cadre de vie prestigieux sous mandat exclusif CK Immobilier. Titre foncier vérifié et sécurité garantie.`;
  const defaultFeatures = property.features && property.features.length > 0
    ? property.features
    : ['Sécurité H24 & Gardiennage', 'Titre Foncier Unanimement Vérifié', 'Finition de Standing', 'Groupe Électrogène & Forage', 'Parking Privatif Sécurisé', 'Vue Dégagée & Calme'];

  // Pre-filled WhatsApp Message
  const whatsappMessage = encodeURIComponent(
    `Bonjour CK Immobilier SARL, je souhaite avoir des informations et planifier une visite pour le bien d'exception :\n\n📌 *${property.title}*\n📍 Localisation : ${property.location}, ${property.city}\n💰 Prix : ${property.price}\n🆔 Réf : ${property.id.toUpperCase()}`
  );
  const whatsappUrl = `https://wa.me/237678386875?text=${whatsappMessage}`;

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back Link */}
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('property.returnCatalog')}</span>
      </Link>

      {/* Main Grid: Gallery & Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Interactive Multi-Photo Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Display Image */}
          <div className="relative h-[440px] sm:h-[500px] rounded-2xl overflow-hidden border border-[#4d4635]/40 shadow-2xl bg-[#0c0f0f] group">
            <img
              src={gallery[activeImageIndex]}
              alt={`${property.title} - Vue ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414]/80 via-transparent to-transparent"></div>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className={`font-['Hanken_Grotesk'] text-xs font-bold px-3 py-1 rounded shadow-lg tracking-wider ${
                property.listingType === 'SALE' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#68dba9] text-[#003822]'
              }`}>
                {property.listingType === 'SALE' ? t('property.saleBadge') : t('property.rentBadge')}
              </span>

              {property.isDirectCk && (
                <span className="inline-flex items-center gap-1 bg-[#121414]/90 text-[#f2ca50] border border-[#f2ca50]/50 text-xs font-['Hanken_Grotesk'] font-bold px-3 py-1 rounded shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
                  {t('property.directCkBadge')}
                </span>
              )}
            </div>

            {/* Photo Counter */}
            <span className="absolute bottom-4 right-4 bg-[#121414]/90 border border-[#4d4635]/50 text-xs font-['Hanken_Grotesk'] font-bold text-[#e2e2e2] px-3 py-1 rounded-full">
              {t('property.photo')} {activeImageIndex + 1} / {gallery.length}
            </span>
          </div>

          {/* Thumbnails Row */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((imgUrl: string, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative bg-[#0c0f0f] ${
                    activeImageIndex === index
                      ? 'border-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.4)] scale-105'
                      : 'border-[#4d4635]/40 opacity-70 hover:opacity-100 hover:border-[#f2ca50]/50'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Vignette ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Property Metadata & Action Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-8 rounded-2xl border border-[#f2ca50]/30 shadow-2xl space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-[#4d4635]/30 pb-6">
              <div className="flex items-center gap-2 text-xs font-['Hanken_Grotesk'] font-bold text-[#f2ca50]">
                <MapPin className="w-4 h-4 text-[#f2ca50]" />
                <span>{property.location.toUpperCase()} — {property.city.toUpperCase()}</span>
              </div>
              
              <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2] leading-tight">
                {property.title}
              </h1>

              <div className="pt-2">
                <span className="font-['Playfair_Display'] text-3xl font-bold text-[#f2ca50]">
                  {property.price}
                </span>
              </div>
            </div>

            {/* Key Features Specs */}
            <div className="grid grid-cols-3 gap-4 py-2 border-b border-[#4d4635]/30 text-center">
              <div className="bg-[#1a1c1c] p-3 rounded-lg border border-[#4d4635]/30 space-y-1">
                <Maximize2 className="w-4 h-4 text-[#f2ca50] mx-auto" />
                <span className="block font-['Playfair_Display'] font-bold text-sm text-[#e2e2e2]">
                  {property.surface} m²
                </span>
                <span className="block font-['Hanken_Grotesk'] text-[10px] text-[#99907c]">{t('property.surfaceLabel')}</span>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-lg border border-[#4d4635]/30 space-y-1">
                <BedDouble className="w-4 h-4 text-[#f2ca50] mx-auto" />
                <span className="block font-['Playfair_Display'] font-bold text-sm text-[#e2e2e2]">
                  {property.bedrooms}
                </span>
                <span className="block font-['Hanken_Grotesk'] text-[10px] text-[#99907c]">{t('property.bedroomsLabel')}</span>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-lg border border-[#4d4635]/30 space-y-1">
                <Bath className="w-4 h-4 text-[#f2ca50] mx-auto" />
                <span className="block font-['Playfair_Display'] font-bold text-sm text-[#e2e2e2]">
                  {bathroomsCount}
                </span>
                <span className="block font-['Hanken_Grotesk'] text-[10px] text-[#99907c]">{t('property.bathroomsLabel')}</span>
              </div>
            </div>

            {/* UI/UX Pro Max Action Buttons */}
            <div className="space-y-3 pt-2">
              
              {/* Primary Action 1: Instant WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-['Hanken_Grotesk'] font-bold text-xs tracking-widest px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('property.whatsappButton')}</span>
              </a>

              {/* Primary Action 2: Schedule Private Visit */}
              <button
                type="button"
                onClick={() => {
                  setIsVisitModalOpen(true);
                  setVisitSubmitted(false);
                }}
                className="w-full bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-widest px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('property.visitButton')}</span>
              </button>

              <div className="pt-2 text-center">
                <a
                  href="tel:+237678386875"
                  className="inline-flex items-center gap-2 text-xs font-['Hanken_Grotesk'] text-[#f2ca50] hover:underline tracking-wider font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('property.directCall')}</span>
                </a>
              </div>

            </div>

            {/* Direct CK Security Guarantee */}
            <div className="bg-[#1a1c1c] p-4 rounded-xl border border-[#4d4635]/40 flex items-start gap-3 text-xs text-[#d0c5af] font-['Manrope']">
              <ShieldCheck className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#e2e2e2] block">{t('property.titleGuarantee')}</strong>
                {t('property.titleGuaranteeDesc')}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Detailed Description & Services */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#4d4635]/40 space-y-6">
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2] border-b border-[#4d4635]/30 pb-4">
          {t('property.editorialDesc')}
        </h2>
        <p className="font-['Manrope'] text-base text-[#d0c5af] leading-relaxed font-light">
          {descriptionText}
        </p>

        <div className="pt-4 border-t border-[#4d4635]/30 space-y-4">
          <h3 className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-[0.2em]">
            {t('property.luxuryEquipments')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {defaultFeatures.map((feat: string, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-[#1a1c1c] border border-[#4d4635]/40 px-3.5 py-2.5 rounded-lg text-xs text-[#e2e2e2] font-['Manrope']">
                <Check className="w-4 h-4 text-[#f2ca50] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Mapbox Map Section for this Property */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#f2ca50]/30 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4d4635]/30 pb-4">
          <div>
            <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-widest flex items-center gap-1.5 mb-1">
              <Compass className="w-4 h-4 text-[#f2ca50]" />
              LOCALISATION 3D & CARTE INTERACTIVE
            </span>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
              Secteur & Cadre de Vie ({property.location}, {property.city})
            </h3>
          </div>
          <span className="text-xs text-[#d0c5af] font-['Manrope'] bg-[#1a1c1c] px-3 py-1.5 rounded-full border border-[#4d4635]/40 shrink-0">
            📍 Marqueur Exclusif CK Immobilier
          </span>
        </div>

        <div className="h-[420px] rounded-xl overflow-hidden border border-[#4d4635]/40 shadow-xl relative">
          <PropertyMap properties={[property]} selectedPropertyId={property.id} />
        </div>
      </div>

      {/* UI/UX Pro Max Interactive Private Visit Modal */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0f0f]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#141616] border border-[#f2ca50]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(false)}
              className="absolute top-4 right-4 text-[#99907c] hover:text-[#f2ca50] p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {visitSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
                  {t('contact.successTitle')}
                </h3>
                <p className="font-['Manrope'] text-sm text-[#d0c5af]">
                  {t('contact.successDesc')}
                </p>
                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(false)}
                  className="bg-[#f2ca50] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs px-6 py-2.5 rounded hover:bg-[#ffe088] cursor-pointer"
                >
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-widest block">
                    {t('property.bookPrivateTour')}
                  </span>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#e2e2e2]">
                    {t('property.bookPrivateTour')}
                  </h3>
                  <p className="text-xs text-[#99907c] font-['Manrope']">
                    {property.title}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-['Hanken_Grotesk'] font-bold text-[#d0c5af] mb-1">
                      {t('contact.fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-3.5 py-2.5 text-xs text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-['Hanken_Grotesk'] font-bold text-[#d0c5af] mb-1">
                      {t('contact.phoneWhatsapp')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('contact.phonePlaceholder')}
                      className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-3.5 py-2.5 text-xs text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-['Hanken_Grotesk'] font-bold text-[#d0c5af] mb-1">
                      DATE
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-3.5 py-2.5 text-xs text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-widest py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contact.submitRequest')}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
