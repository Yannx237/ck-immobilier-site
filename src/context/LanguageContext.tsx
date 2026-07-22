import React, { createContext, useContext, useState } from 'react';

export type Language = 'FR' | 'EN';

export interface Translations {
  // Navbar & Footer
  navHome: string;
  navPortfolio: string;
  navTeam: string;
  navContact: string;
  clientPortal: string;
  prestigePatrimony: string;
  certifiedDirectCk: string;
  minhduAccredited: string;

  // Search & Filters
  buy: string;
  rent: string;
  allCities: string;
  douala: string;
  yaounde: string;
  budgetFCFA: string;
  searchProperties: string;
  directCkOnly: string;
  viewGrid: string;
  viewMap: string;

  // Hero & Titles
  heroTitle1: string;
  heroTitle2: string;
  heroSub: string;
  ourPatrimony: string;
  exclusivePatrimony: string;
  seeAllProperties: string;

  // Property details & Cards
  saleBadge: string;
  rentBadge: string;
  directCkBadge: string;
  perMonth: string;
  bedrooms: string;
  surface: string;
  bookPrivateTour: string;
  callAgent: string;

  // Contact form
  contactTitle: string;
  contactSub: string;
  fullName: string;
  phoneWhatsapp: string;
  emailAddress: string;
  selectMotif: string;
  message: string;
  submitRequest: string;
}

const translations: Record<Language, Translations> = {
  FR: {
    navHome: 'ACCUEIL',
    navPortfolio: 'PORTFOLIO PATRIMOINE',
    navTeam: 'ÉQUIPE & SERVICES',
    navContact: 'CONTACT PRIVÉ',
    clientPortal: 'ESPACE CLIENT',
    prestigePatrimony: 'PRESTIGE & PATRIMOINE',
    certifiedDirectCk: 'MEMBRE CERTIFIÉ DIRECT CK',
    minhduAccredited: 'AGRÉMENT MINHDU • DIRECT CK',

    buy: 'ACHETER',
    rent: 'LOUER',
    allCities: 'TOUTES LES VILLES',
    douala: 'DOUALA',
    yaounde: 'YAOUNDÉ',
    budgetFCFA: 'BUDGET MAXIMUM (FCFA)',
    searchProperties: 'RECHERCHER DES BIENS',
    directCkOnly: 'MANDATS DIRECT CK',
    viewGrid: 'VUE GRILLE',
    viewMap: 'VUE CARTE INTERACTIVE',

    heroTitle1: "L'EXCELLENCE IMMOBILIÈRE,",
    heroTitle2: 'À CHAQUE ÉTAPE.',
    heroSub: "Découvrez une sélection exclusive de résidences d'exception, villas contemporaines et penthouses de prestige à Douala et Yaoundé.",
    ourPatrimony: 'Notre Patrimoine',
    exclusivePatrimony: 'Exclusif',
    seeAllProperties: 'VOIR TOUT LE PATRIMOINE',

    saleBadge: 'ACHAT',
    rentBadge: 'LOCATION',
    directCkBadge: 'MANDAT DIRECT CK',
    perMonth: '/ mois',
    bedrooms: 'chambres',
    surface: 'm²',
    bookPrivateTour: 'RÉSERVER LA VISITE PRIVÉE',
    callAgent: 'CONTACT DIRECT AGENT',

    contactTitle: 'Contact & Prise de Rendez-vous Privé',
    contactSub: 'Notre cabinet vous accueille en toute confidentialité dans ses bureaux de Douala (Bonapriso) et Yaoundé (Carrefour Golf).',
    fullName: 'VOTRE NOM & PRÉNOM *',
    phoneWhatsapp: 'TÉLÉPHONE / WHATSAPP *',
    emailAddress: 'ADRESSE EMAIL',
    selectMotif: 'OBJET DE LA DEMANDE *',
    message: 'VOTRE MESSAGE / SPÉCIFICATIONS DU PROJET',
    submitRequest: 'TRANSMETTRE MA DEMANDE PRIVÉE',
  },
  EN: {
    navHome: 'HOME',
    navPortfolio: 'PROPERTY PORTFOLIO',
    navTeam: 'TEAM & SERVICES',
    navContact: 'PRIVATE CONTACT',
    clientPortal: 'CLIENT PORTAL',
    prestigePatrimony: 'PRESTIGE & PATRIMONY',
    certifiedDirectCk: 'CERTIFIED DIRECT CK MEMBER',
    minhduAccredited: 'MINHDU ACCREDITED • DIRECT CK',

    buy: 'BUY',
    rent: 'RENT',
    allCities: 'ALL CITIES',
    douala: 'DOUALA',
    yaounde: 'YAOUNDE',
    budgetFCFA: 'MAXIMUM BUDGET (FCFA)',
    searchProperties: 'SEARCH PROPERTIES',
    directCkOnly: 'DIRECT CK MANDATES',
    viewGrid: 'GRID VIEW',
    viewMap: 'INTERACTIVE MAP VIEW',

    heroTitle1: 'REAL ESTATE EXCELLENCE,',
    heroTitle2: 'AT EVERY STEP.',
    heroSub: 'Discover an exclusive selection of luxury residences, contemporary villas and prestige penthouses in Douala and Yaounde.',
    ourPatrimony: 'Our Portfolio',
    exclusivePatrimony: 'Exclusive',
    seeAllProperties: 'VIEW ENTIRE PORTFOLIO',

    saleBadge: 'FOR SALE',
    rentBadge: 'FOR RENT',
    directCkBadge: 'DIRECT CK MANDATE',
    perMonth: '/ month',
    bedrooms: 'bedrooms',
    surface: 'sqm',
    bookPrivateTour: 'BOOK PRIVATE TOUR',
    callAgent: 'DIRECT AGENT CALL',

    contactTitle: 'Contact & Private Appointment',
    contactSub: 'Our firm welcomes you with complete confidentiality in Douala (Bonapriso) and Yaounde (Carrefour Golf) offices.',
    fullName: 'YOUR FULL NAME *',
    phoneWhatsapp: 'PHONE / WHATSAPP *',
    emailAddress: 'EMAIL ADDRESS',
    selectMotif: 'PURPOSE OF INQUIRY *',
    message: 'YOUR MESSAGE / PROJECT SPECIFICATIONS',
    submitRequest: 'SUBMIT PRIVATE INQUIRY',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('FR');

  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations['FR'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
