import React from 'react';
import { ShieldCheck, Award, Scale, CheckCircle2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EthicsCharter: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-[#4d4635]/30 pb-8">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            ENGAGEMENT DE QUALITÉ & D'ÉTHIQUE
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2]">
          Charte Éthique & Label Prestige CK Immobilier SARL
        </h1>
        <p className="font-['Manrope'] text-sm text-[#d0c5af]">
          Les principes déontologiques régissant toutes nos transactions immobilières d'exception au Cameroun.
        </p>
      </div>

      {/* Main Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#f2ca50]/30 space-y-8 font-['Manrope'] text-sm text-[#d0c5af] leading-relaxed">
        
        {/* Pillar 1 */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#f2ca50]" />
            1. Transparence Juridique & Vérification des Titres Fonciers
          </h2>
          <p>
            En conformité avec le Ministère de l'Habitat et du Développement Urbain (MINHDU), <strong className="text-[#e2e2e2]">CK Immobilier SARL</strong> s'engage à ne commercialiser aucun bien non vérifié. Chaque transaction fait l'objet d'un audit de Titre Foncier, de certificat de propriété récent et de vérification des droits de mutation.
          </p>
        </section>

        {/* Pillar 2 */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#f2ca50]" />
            2. Le Label DIRECT CK
          </h2>
          <p>
            Le label <strong className="text-[#f2ca50]">DIRECT CK</strong> garantit qu'un bien est géré sous mandat direct exclusif sans aucun intermédiaire superflu. Cela assure au client acquéreur la transparence du prix réel du propriétaire sans aucune surévaluation artificielle.
          </p>
        </section>

        {/* Pillar 3 */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Star className="w-5 h-5 text-[#f2ca50]" />
            3. Standard d'Excellence du Service Conciergerie
          </h2>
          <div className="bg-[#1a1c1c] p-6 rounded-xl border border-[#4d4635]/30 space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
              <span>Accompagnement personnalisé du premier contact jusqu'à la signature notariée.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
              <span>Présence de nos associés aux agences de Douala (Bonapriso) et Yaoundé (Carrefour Golf).</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
              <span>Discrétion et neutralité absolue dans la négociation du juste prix.</span>
            </div>
          </div>
        </section>

      </div>

      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline tracking-widest"
        >
          <span>SOLLICITER UN CONSEIL PATRIMONIAL AVEC UN ASSOCIÉ SENIOR</span>
        </Link>
      </div>

    </div>
  );
};
