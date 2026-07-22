import React from 'react';
import { ShieldCheck, Award, CheckCircle, MessageCircle, Mail, Sparkles, MapPin } from 'lucide-react';


export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Christian Kouam',
      role: 'Fondateur & Directeur Général',
      specialty: 'YAOUNDÉ — CARREFOUR GOLF & BASTOS',
      bio: 'Plus de 15 ans d\'expérience dans le conseil financier, les mandats exclusifs et la gestion des actifs immobiliers d\'exception en Afrique Centrale.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsapp: '237678386875',
      email: 'c.kouam@ck-immobilier.cm',
      tag: 'ASSOCIÉ FONDATEUR',
    },
    {
      name: 'Vanessa Ndedi',
      role: 'Directrice Conciergerie & Off-Market',
      specialty: 'DOUALA — LOGPOM & BONAPRISO',
      bio: 'Spécialiste des transactions confidentielles et des résidences privées haut de gamme à Douala sous accord de confidentialité (NDA).',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      whatsapp: '237656242081',
      email: 'v.ndedi@ck-immobilier.cm',
      tag: 'EXPERT OFF-MARKET',
    },
    {
      name: 'Marc-Aurèle Bastos',
      role: 'Responsable Pôle Diplomatie & Institutions',
      specialty: 'YAOUNDÉ — CORPS DIPLOMATIQUE',
      bio: 'Expert en investissements pour représentations diplomatiques, ambassades et grandes propriétés de prestige au secteur Golf de Yaoundé.',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      whatsapp: '237678386875',
      email: 'ma.bastos@ck-immobilier.cm',
      tag: 'CONSEIL INSTITUTIONNEL',
    },
  ];

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
          L'Équipe Dirigeante CK Immobilier
        </h1>
        <p className="font-['Manrope'] text-base text-[#d0c5af]">
          Une équipe chevronnée de courtiers seniors et d'experts fonciers unis par la même exigence de confidentialité et de déontologie.
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
            Une couverture directe des deux capitales économiques et politiques au Carrefour Golf (Yaoundé) et Carrefour Bassong (Douala).
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-widest block">
            INTERLOCUTEURS PRIVILÉGIÉS
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2]">
            Vos Associés & Courtiers Seniors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-[#4d4635]/40 hover:border-[#f2ca50]/60 transition-all group shadow-2xl flex flex-col justify-between">
              
              <div>
                <div className="h-80 overflow-hidden bg-[#0c0f0f] relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141616] via-transparent to-transparent"></div>
                  
                  <span className="absolute top-4 left-4 bg-[#121414]/90 text-[#f2ca50] border border-[#f2ca50]/30 text-[9px] font-['Hanken_Grotesk'] font-bold px-2.5 py-1 rounded-full tracking-widest">
                    {member.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#f2ca50]" />
                      {member.specialty}
                    </span>
                    <h3 className="font-['Playfair_Display'] font-bold text-2xl text-[#e2e2e2]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af]">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#99907c] font-['Manrope'] leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <a
                  href={`https://wa.me/${member.whatsapp}?text=${encodeURIComponent(`Bonjour ${member.name}, je vous contacte depuis le site CK Immobilier pour un projet de prestige.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-['Hanken_Grotesk'] font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="bg-[#1a1c1c] hover:bg-[#252828] text-[#e2e2e2] border border-[#4d4635]/50 text-[11px] font-['Hanken_Grotesk'] font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>EMAIL</span>
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
