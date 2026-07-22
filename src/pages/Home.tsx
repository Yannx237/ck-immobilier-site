import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { BentoGrid } from '../components/BentoGrid';
import { PropertyCard } from '../components/PropertyCard';
import { sampleProperties } from '../data/properties';
import { ShieldCheck, Award, Eye, Key, ChevronRight, PhoneCall } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do"
            alt="Architecture de Prestige"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-[#121414]/75 backdrop-brightness-75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-[#121414]/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-8">
          <div className="inline-flex items-center gap-2 bg-[#1e2020]/90 border border-[#f2ca50]/40 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(242,202,80,0.2)]">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
              IMMOBILIER PRESTIGE
            </span>
          </div>

          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold text-[#e2e2e2] leading-tight drop-shadow-2xl">
            L'<span className="gold-gradient-text">EXCELLENCE</span> IMMOBILIÈRE,<br />
            À CHAQUE ÉTAPE.
          </h1>

          <p className="font-['Manrope'] text-lg sm:text-xl text-[#d0c5af] max-w-2xl font-light">
            Découvrez une sélection exclusive de résidences d'exception, villas contemporaines et penthouses de prestige à Douala et Yaoundé.
          </p>

          {/* SearchBar Component */}
          <div className="w-full mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Section Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#4d4635]/30 pb-6 gap-4">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2] mb-2">
              Notre Patrimoine <span className="text-[#f2ca50] italic font-light">Exclusif</span>
            </h2>
            <p className="font-['Manrope'] text-base text-[#d0c5af] max-w-xl">
              Une sélection rigoureuse des plus belles adresses du Cameroun, gérées sous mandat exclusif par notre cabinet.
            </p>
          </div>

          <Link
            to="/catalogue"
            className="font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50] hover:text-[#ffe088] transition-colors flex items-center gap-2 pb-1"
          >
            <span>VOIR TOUT LE PATRIMOINE</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <BentoGrid />
      </section>

      {/* Services / Value Proposition Section */}
      <section className="bg-[#1a1c1c] border-y border-[#4d4635]/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
              L'ENGAGEMENT PRESTIGE
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2]">
              Un Accompagnement sur-mesure pour Patrimoines d'Exception
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="glass-panel p-8 rounded-xl space-y-4 hover-gold-glow">
              <div className="w-12 h-12 rounded-lg bg-[#f2ca50]/15 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
                Vente & Acquisition Discrète
              </h3>
              <p className="text-sm text-[#d0c5af] font-['Manrope'] leading-relaxed">
                Transactions confidentielles hors-marché (Off-Market) réservées à nos clients VIP et investisseurs institutionnels.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl space-y-4 hover-gold-glow">
              <div className="w-12 h-12 rounded-lg bg-[#f2ca50]/15 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
                Gestion de Patrimoine Immobilier
              </h3>
              <p className="text-sm text-[#d0c5af] font-['Manrope'] leading-relaxed">
                Valorisation d'actifs, audit foncier, optimisation fiscale et gestion locative haut de gamme à Douala et Yaoundé.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl space-y-4 hover-gold-glow">
              <div className="w-12 h-12 rounded-lg bg-[#f2ca50]/15 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
                Conciergerie & Mandat Exclusif
              </h3>
              <p className="text-sm text-[#d0c5af] font-['Manrope'] leading-relaxed">
                Prise en charge intégrale des démarches administratives, de l'aménagement d'intérieur et des visites privées.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12 border-b border-[#4d4635]/30 pb-6">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2]">
              Dernières Opportunités en Mandat
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50] hover:underline"
          >
            PARCOURIR LE CATALOGUE
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProperties.slice(0, 3).map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* CTA Private Consultation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 border border-[#f2ca50]/30 shadow-[0_0_30px_rgba(242,202,80,0.15)]">
          <div className="max-w-2xl space-y-3">
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
              CONSULTATION PRIVÉE & MANDAT
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#e2e2e2]">
              Vous désirez confier la vente ou la recherche d'un bien d'exception ?
            </h2>
            <p className="font-['Manrope'] text-base text-[#d0c5af]">
              Nos experts seniors se tiennent à votre disposition pour une étude de projet confidentielle sous 24h.
            </p>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-sm tracking-widest px-8 py-4 rounded shadow-[0_0_20px_rgba(242,202,80,0.4)] transition-all shrink-0"
          >
            <PhoneCall className="w-5 h-5" />
            <span>PRENDRE RENDEZ-VOUS</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
