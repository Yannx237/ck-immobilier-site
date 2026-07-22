import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-[#4d4635]/30 pb-8">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            PROTECTION DES DONNÉES & CONFIDENTIALITÉ
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2]">
          Politique de Confidentialité & Engagement NDA
        </h1>
        <p className="font-['Manrope'] text-sm text-[#d0c5af]">
          Protection des données personnelles et garantie de confidentialité des mandats Off-Market.
        </p>
      </div>

      {/* Main Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#f2ca50]/30 space-y-8 font-['Manrope'] text-sm text-[#d0c5af] leading-relaxed">
        
        {/* Section 1: Confidentialité des Mandats */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#f2ca50]" />
            1. Engagement de Confidentialité Strict (Transactions Off-Market)
          </h2>
          <p>
            En tant que cabinet spécialisé dans l'immobilier d'exception à Douala et Yaoundé (Carrefour Golf), <strong className="text-[#e2e2e2]">CK Immobilier SARL</strong> garantit la confidentialité totale de l'identité de ses clients acheteurs et vendeurs. Les biens confidentiels sous accord de non-divulgation (NDA) ne sont présentés qu'après vérification d'identité et de capacité financière.
          </p>
        </section>

        {/* Section 2: Collecte des données */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#f2ca50]" />
            2. Collecte & Utilisation des Données Personnelles
          </h2>
          <p>
            Les informations personnelles recueillies via nos formulaires de contact ou de demande de visite privée (Nom, Numéro de téléphone, adresse email, critères de recherche) sont strictement destinées au traitement interne de votre dossier par nos associés agréés.
          </p>
          <div className="bg-[#1a1c1c] p-4 rounded-xl border border-[#4d4635]/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#e2e2e2]">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
              <span>Aucune revente ni cession de vos données à des tiers ou partenaires commerciaux.</span>
            </div>
            <div className="flex items-center gap-2 text-[#e2e2e2]">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
              <span>Conservation sécurisée pendant la durée stricte nécessaire à la réalisation du mandat.</span>
            </div>
          </div>
        </section>

        {/* Section 3: Droits des Utilisateurs */}
        <section className="space-y-3">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#f2ca50] flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-[#f2ca50]" />
            3. Droit d'Accès, de Rectification et de Suppression
          </h2>
          <p>
            Conformément à la réglementation en vigueur, vous disposez à tout moment d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, adressez une simple demande écrite à notre service juridique à l'adresse <strong className="text-[#f2ca50]">dpo@ck-immobilier.cm</strong> ou par courrier à notre siège social (BP 15387 Douala).
          </p>
        </section>

      </div>

      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] hover:underline tracking-widest"
        >
          <span>DEMANDER LA SUPPRESSION OU LA RECTIFICATION DE VOS DONNÉES</span>
        </Link>
      </div>

    </div>
  );
};
