import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            CONCIERGERIE PRIVÉE & MANDATS
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#e2e2e2]">
          Contact & Prise de Rendez-vous Privé
        </h1>
        <p className="font-['Manrope'] text-base text-[#d0c5af]">
          Notre cabinet vous accueille en toute confidentialité dans ses bureaux de Douala (Bonapriso) et Yaoundé (Carrefour Golf).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Form Column */}
        <div className="lg:col-span-2 glass-panel p-8 sm:p-12 rounded-2xl border border-[#f2ca50]/30 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
                Votre demande a bien été enregistrée
              </h3>
              <p className="font-['Manrope'] text-sm text-[#d0c5af] max-w-md mx-auto">
                Un de nos associés seniors vous recontactera sous 24 heures pour convenir d'un entretien confidentiel.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#e2e2e2] border-b border-[#4d4635]/30 pb-4">
                Formulaire de Prise de Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    VOTRE NOM & PRÉNOM *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nom complet"
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    TÉLÉPHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+237 600 00 00 00"
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    ADRESSE EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="adresse@domaine.cm"
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    OBJET DE LA DEMANDE *
                  </label>
                  <select
                    required
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionnez un motif</option>
                    <option value="acquisition">Acquisition d'un bien d'exception</option>
                    <option value="mandat">Confier la vente sous mandat exclusif</option>
                    <option value="patrimoine">Gestion & Audit de patrimoine</option>
                    <option value="autre">Autre demande conciergerie</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                  VOTRE MESSAGE / SPÉCIFICATIONS DU PROJET
                </label>
                <textarea
                  rows={4}
                  placeholder="Veuillez préciser vos attentes (budget, secteur géographique, critères particuliers)..."
                  className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-widest px-8 py-4 rounded shadow-[0_0_15px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMETTRE MA DEMANDE PRIVÉE</span>
              </button>
            </form>
          )}
        </div>

        {/* Office Contact Info */}
        <div className="space-y-8">
          
          <div className="bg-[#1a1c1c] p-8 rounded-2xl border border-[#4d4635]/40 space-y-6">
            <h3 className="font-['Playfair_Display'] font-semibold text-xl text-[#f2ca50]">
              Siège Social & Agences
            </h3>

            <div className="space-y-4 text-sm text-[#d0c5af] font-['Manrope']">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">Douala — Siège Social</strong>
                  Avenue Njo-Njo, Quartier Bonapriso, BP 15387 Douala
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">Yaoundé — Agence Golf</strong>
                  Carrefour Golf, Yaoundé
                </div>
              </div>

              <div className="border-t border-[#4d4635]/30 pt-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>+237 690 00 00 00 / +237 670 00 00 00</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>contact@ck-immobilier.cm</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>Lun — Sam : 08h00 à 19h00 (Sur RDV)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
