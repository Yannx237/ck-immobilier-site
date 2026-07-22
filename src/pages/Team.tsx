import React from 'react';
import { ShieldCheck, Award, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import founderImg from '../assets/colbert_kouatcho.jpg';

export const Team: React.FC = () => {
  const founderMember = {
    name: 'Colbert Kouatcho',
    role: 'Fondateur & Directeur Général',
    specialty: 'YAOUNDÉ (SIÈGE) & DOUALA (AGENCE)',
    bio: 'Fondateur et visionnaire du cabinet CK Immobilier SARL. Plus de 15 ans d\'expertise dans la sécurisation foncière, la vérification systématique des Titres Fonciers, les mandats exclusifs et la gestion du patrimoine immobilier d\'exception au Cameroun.',
    imageUrl: founderImg,
    tag: 'FONDATEUR & DG',
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header UI/UX Pro Max */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            NOTRE CABINET & GOUVERNANCE
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#e2e2e2]">
          La Direction CK Immobilier
        </h1>
        <p className="font-['Manrope'] text-base text-[#d0c5af]">
          Un accompagnement d'exception sous la direction stratégique de Mr Colbert Kouatcho.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#141616] hover:bg-[#181a1a] p-8 rounded-2xl border border-[#4d4635]/40 hover:border-[#f2ca50]/50 transition-all space-y-3 shadow-xl">
          <Award className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Excellence & Rigueur Foncière
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Chaque bien sous mandat fait l'objet d'un audit juridique préalable systématique auprès des conservations foncières.
          </p>
        </div>

        <div className="bg-[#141616] hover:bg-[#181a1a] p-8 rounded-2xl border border-[#4d4635]/40 hover:border-[#f2ca50]/50 transition-all space-y-3 shadow-xl">
          <Sparkles className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Confidentialité & Off-Market
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Respect scrupuleux de l'anonymat de nos acquéreurs et vendeurs d'exception sous accord de confidentialité.
          </p>
        </div>

        <div className="bg-[#141616] hover:bg-[#181a1a] p-8 rounded-2xl border border-[#4d4635]/40 hover:border-[#f2ca50]/50 transition-all space-y-3 shadow-xl">
          <CheckCircle className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Double Ancrage Yaoundé & Douala
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Une couverture directe des deux capitales au Carrefour Golf (Yaoundé) et Carrefour Bassong (Douala).
          </p>
        </div>
      </div>

      {/* Sole Founder Profile Showcase */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-widest block">
            INTERLOCUTEUR PRIVILÉGIÉ
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2]">
            Le Fondateur & Directeur Général
          </h2>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-[#f2ca50]/40 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-8">
          
          <div className="md:col-span-5 h-96 rounded-xl overflow-hidden bg-[#0c0f0f] relative">
            <img
              src={founderMember.imageUrl}
              alt={founderMember.name}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            <span className="absolute top-4 left-4 bg-[#121414]/90 text-[#f2ca50] border border-[#f2ca50]/40 text-[10px] font-['Hanken_Grotesk'] font-bold px-3 py-1 rounded-full tracking-widest">
              {founderMember.tag}
            </span>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-widest flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#f2ca50]" />
                {founderMember.specialty}
              </span>
              <h3 className="font-['Playfair_Display'] font-bold text-3xl text-[#e2e2e2]">
                {founderMember.name}
              </h3>
              <p className="text-sm font-['Hanken_Grotesk'] font-bold text-[#d0c5af]">
                {founderMember.role}
              </p>
            </div>

            <p className="text-sm text-[#d0c5af] font-['Manrope'] leading-relaxed">
              {founderMember.bio}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
