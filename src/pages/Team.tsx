import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle } from 'lucide-react';

export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Christian Kouam',
      role: 'Fondateur & Directeur Général',
      bio: 'Plus de 15 ans d\'expérience dans le conseil financier et les actifs immobiliers d\'exception en Afrique Centrale.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Vanessa Ndedi',
      role: 'Directrice Conciergerie & Off-Market',
      bio: 'Spécialiste des transactions confidentielles et des résidences privées à Douala (Bonapriso & Bonanjo).',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Marc-Aurèle Bastos',
      role: 'Responsable Pôle Yaoundé & Diplomatie',
      bio: 'Expert en investissements d\'ambassades et propriétés de prestige au quartier Bastos et au Golf.',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            NOTRE CABINET & VALEURS
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#e2e2e2]">
          L'Équipe Dirigeante CK Immobilier
        </h1>
        <p className="font-['Manrope'] text-base text-[#d0c5af]">
          Une équipe chevronnée de courtiers et d'experts fonciers unis par la même quête d'excellence.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#1a1c1c] p-8 rounded-xl border border-[#4d4635]/40 space-y-3">
          <Award className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Excellence & Rigueur
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Chaque bien sous mandat fait l'objet d'un audit juridique et technique approfondi avant sa commercialisation.
          </p>
        </div>

        <div className="bg-[#1a1c1c] p-8 rounded-xl border border-[#4d4635]/40 space-y-3">
          <Users className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Confidentialité Absolue
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Respect scrupuleux de l'anonymat de nos acquéreurs et vendeurs dans le cadre de transactions d'exception.
          </p>
        </div>

        <div className="bg-[#1a1c1c] p-8 rounded-xl border border-[#4d4635]/40 space-y-3">
          <CheckCircle className="w-8 h-8 text-[#f2ca50]" />
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#e2e2e2]">
            Ancrage Local & International
          </h3>
          <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed">
            Une parfaite maîtrise du marché immobilier camerounais couplée aux standards des agences de prestige internationales.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-8">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2] text-center">
          Vos Interlocuteurs Privilégiés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="glass-panel rounded-xl overflow-hidden border border-[#4d4635]/40 hover:border-[#f2ca50]/60 transition-all group">
              <div className="h-72 overflow-hidden bg-[#0c0f0f]">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-widest block">
                  {member.role.toUpperCase()}
                </span>
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#e2e2e2]">
                  {member.name}
                </h3>
                <p className="text-xs text-[#d0c5af] font-['Manrope'] leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
