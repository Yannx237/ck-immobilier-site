import React from 'react';
import { ShieldCheck, Building2, MapPin, Award, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';


export const LegalNotice: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-[#4d4635]/30 pb-8">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            INFORMATION RÉGLEMENTAIRE MINHDU
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2]">
          Mentions Légales & Informations Officieuses
        </h1>
        <p className="font-['Manrope'] text-sm text-[#d0c5af]">
          Informations légales relatives à la société CK Immobilier SARL, agrée au République du Cameroun.
        </p>
      </div>

      {/* Main Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#f2ca50]/30 space-y-8 font-['Manrope'] text-sm text-[#d0c5af] leading-relaxed">
        
        {/* Section 1: Identification de la Société */}
        <section className="space-y-4">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#f2ca50]" />
            1. Identification de la Société
          </h2>
          <div className="bg-[#1a1c1c] p-6 rounded-xl border border-[#4d4635]/40 space-y-2 text-xs">
            <p><strong className="text-[#e2e2e2]">Raison Sociale :</strong> CK IMMOBILIER SARL</p>
            <p><strong className="text-[#e2e2e2]">Forme Juridique :</strong> Société à Responsabilité Limitée (SARL) de droit camerounais</p>
            <p><strong className="text-[#e2e2e2]">Agrément Officiel :</strong> Inscrite au tableau des Agents et Promoteurs Immobiliers agréés par le Ministère de l'Habitat et du Développement Urbain (MINHDU - Cameroun)</p>
            <p><strong className="text-[#e2e2e2]">Objet Social :</strong> Transaction immobilière, Gestion de patrimoine, Conseil foncier et Conciergerie de prestige</p>
          </div>
        </section>

        {/* Section 2: Sièges & Bureaux */}
        <section className="space-y-4">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#f2ca50]" />
            2. Siège Social & Implantations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#1a1c1c] p-5 rounded-xl border border-[#4d4635]/30">
              <strong className="text-[#f2ca50] block text-sm mb-1">Siège Social & Agence Douala</strong>
              <p className="text-[#e2e2e2]">Avenue Njo-Njo, Quartier Bonapriso</p>
              <p className="text-[#99907c]">BP 15387 Douala — Cameroun</p>
            </div>
            <div className="bg-[#1a1c1c] p-5 rounded-xl border border-[#4d4635]/30">
              <strong className="text-[#f2ca50] block text-sm mb-1">Agence Yaoundé</strong>
              <p className="text-[#e2e2e2]">Carrefour Golf, Yaoundé</p>
              <p className="text-[#99907c]">République du Cameroun</p>
            </div>
          </div>
        </section>

        {/* Section 3: Contact & Directeurs */}
        <section className="space-y-4">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#f2ca50]" />
            3. Contact & Direction de la Publication
          </h2>
          <div className="space-y-2 text-xs bg-[#1a1c1c] p-6 rounded-xl border border-[#4d4635]/30">
            <p><strong className="text-[#e2e2e2]">Directeur de Publication :</strong> Direction Générale CK Immobilier SARL</p>
            <p><strong className="text-[#e2e2e2]">Téléphones d'agence :</strong> +237 690 00 00 00 / +237 670 00 00 00</p>
            <p><strong className="text-[#e2e2e2]">Email Officiel :</strong> contact@ck-immobilier.cm</p>
          </div>
        </section>

        {/* Section 4: Propriété Intellectuelle */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50]">
            4. Propriété Intellectuelle & Protection des Marques
          </h2>
          <p>
            L'ensemble des visuels, logos (*CK Immobilier Prestige*), chartes de design, textes et photographies d'architecture présents sur ce site sont la propriété exclusive de CK Immobilier SARL ou font l'objet d'une autorisation spécifique d'exploitation. Toute reproduction partielle ou totale sans accord écrit préalable est strictement interdite.
          </p>
        </section>

        {/* Section 5: Vérification des Titres Fonciers */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#f2ca50]" />
            5. Mandat Direct & Conformité Foncière
          </h2>
          <p>
            Toutes les offres estampillées <strong className="text-[#f2ca50]">DIRECT CK</strong> font l'objet d'un mandat signé préalable et d'une vérification préalable du Titre Foncier auprès de la conservation foncière compétente au Cameroun.
          </p>
        </section>

      </div>

      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline tracking-widest"
        >
          <FileText className="w-4 h-4" />
          <span>POUR TOUTE QUESTION LÉGALE, CONTACTEZ LE SERVICE JURIDIQUE</span>
        </Link>
      </div>

    </div>
  );
};
