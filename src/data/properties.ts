// Import local property assets
import golf1 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.09.38.jpeg';
import golf2 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.09.43 (1).jpeg';
import golf3 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.11.30.jpeg';

import douala1 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.42 (1).jpeg';
import douala2 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.45 (3).jpeg';
import douala3 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.47.jpeg';

import flyer1 from '../assets/properties/general/WhatsApp Image 2026-07-17 at 18.03.44.jpeg';
import flyer2 from '../assets/properties/general/WhatsApp Image 2026-07-17 at 18.03.46.jpeg';

import bangou1 from '../assets/properties/bangou_auberge/WhatsApp Image 2026-07-17 at 18.03.43 (2).jpeg';
import bangou2 from '../assets/properties/bangou_auberge/WhatsApp Image 2026-07-25 at 11.10.47.jpeg';
import bangou3 from '../assets/properties/bangou_auberge/WhatsApp Image 2026-07-25 at 11.10.48.jpeg';

import bamena1 from '../assets/properties/auberge_bamena/WhatsApp Image 2026-07-17 at 18.03.48 (1).jpeg';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  listingType: 'SALE' | 'RENT'; // ACHAT vs LOCATION
  surface: number;
  bedrooms: number;
  imageUrl: string;
  galleryImages: string[];
  isDirectCk?: boolean;
  category: string;
  description?: string;
  features?: string[];
}

export interface PropertyWithMap extends Property {
  mapCoordinates: {
    lat: number;
    lng: number;
    xPercent: number;
    yPercent: number;
  };
  details: {
    yearBuilt: number;
    landSurface: number;
    bathrooms: number;
    garages: number;
  };
}

export const sampleProperties: PropertyWithMap[] = [
  {
    id: '1',
    title: 'Palais des Ambassadeurs (Immeuble CK Golf)',
    location: 'Golf',
    city: 'Yaoundé',
    price: '350 000 000 FCFA',
    listingType: 'SALE',
    surface: 450,
    bedrooms: 5,
    imageUrl: golf1,
    galleryImages: [
      golf1,
      golf2,
      golf3,
    ],
    isDirectCk: true,
    category: 'Immeuble Contemporain',
    description: 'Immeuble de très haut standing situé dans le quartier résidentiel du Golf à Yaoundé. Finitions modernes, sécurité H24, parking privatif et vue panoramique dégagée.',
    features: ['Sécurité H24 & Gardiennage', 'Titre Foncier Unanimement Vérifié', 'Finition de Standing', 'Groupe Électrogène & Forage', 'Parking Privatif Sécurisé', 'Vue Dégagée & Calme'],
    mapCoordinates: { lat: 3.8912, lng: 11.5243, xPercent: 55, yPercent: 35 },
    details: { yearBuilt: 2024, landSurface: 1200, bathrooms: 6, garages: 4 },
  },
  {
    id: '2',
    title: 'Appartement Moderne Climatisé Logpom',
    location: 'Logpom (Carrefour Bassong)',
    city: 'Douala',
    price: '200 000 FCFA / mois',
    listingType: 'RENT',
    surface: 160,
    bedrooms: 3,
    imageUrl: flyer1,
    galleryImages: [
      flyer1,
      flyer2,
      douala1,
      douala2,
      douala3,
    ],
    isDirectCk: true,
    category: 'Appartement Climatisé',
    description: 'Appartement moderne de standing à louer au Carrefour Bassong (Logpom, Douala). Toutes les pièces sont entièrement climatisées. Chaque unité dispose de son propre composé privatif, d\'un compteur ENEO prépayé individuel, d\'un accès continu à l\'eau courante et d\'un grand parking privé.',
    features: [
      'Toutes pièces climatisées ❄️',
      'Compteur ENEO prépayé individuel ⚡',
      'Accès continu à l\'Eau Courante 💧',
      'Composé privatif par appartement 🔒',
      'Parking privé sécurisé 🚗',
      'À quelques mètres de l\'axe principal 🛣️',
    ],
    mapCoordinates: { lat: 4.0754, lng: 9.7421, xPercent: 35, yPercent: 48 },
    details: { yearBuilt: 2024, landSurface: 400, bathrooms: 2, garages: 2 },
  },
  {
    id: '3',
    title: 'Auberge CK Bamena (Escale Confort & Sérénité)',
    location: 'Bamena (En bordure de route)',
    city: 'Ouest',
    price: '10 000 FCFA / nuitée',
    listingType: 'RENT',
    surface: 45,
    bedrooms: 1,
    imageUrl: bamena1,
    galleryImages: [
      bamena1,
    ],
    isDirectCk: true,
    category: 'Auberge de Charme',
    description: 'Auberge CK à Bamena en bordure de route principale. Votre escale confort et sérénité à l\'Ouest Cameroun. Tarifs : Chambre Simple à 10.000 F / nuitée — Chambre VIP à 15.000 F / nuitée. Environnement calme, propreté irréprochable et sécurité H24.',
    features: [
      'Chambre Simple : 10.000 F / nuitée 🛏️',
      'Chambre VIP : 15.000 F / nuitée 👑',
      'Sécurité 24H/24 (7j/7 - 24h/24) 🛡️',
      'Parking Sécurisé 🚗',
      'Accueil chaleureux & Service de qualité 🤝',
      'Emplacement idéal en bordure de route 🛣️',
    ],
    mapCoordinates: { lat: 5.1523, lng: 10.2311, xPercent: 40, yPercent: 52 },
    details: { yearBuilt: 2023, landSurface: 1500, bathrooms: 1, garages: 1 },
  },
  {
    id: '4',
    title: 'Duplex Haut Standing Immeuble CK Golf',
    location: 'Golf',
    city: 'Yaoundé',
    price: '350 000 FCFA / mois',
    listingType: 'RENT',
    surface: 290,
    bedrooms: 3,
    imageUrl: golf2,
    galleryImages: [
      golf2,
      golf1,
      golf3,
    ],
    isDirectCk: true,
    category: 'Duplex de Prestige',
    description: 'Splendide duplex situé dans l\'Immeuble CK au quartier Golf (Yaoundé). Salons volumineux, cuisine équipée, terrasse privative et sécurité renforcée.',
    features: ['Sécurité H24', 'Terrasse Privative', 'Cuisine Équipée', 'Forage & Groupe Électrogène', 'Garages Couverts'],
    mapCoordinates: { lat: 3.8912, lng: 11.5243, xPercent: 62, yPercent: 32 },
    details: { yearBuilt: 2023, landSurface: 350, bathrooms: 3, garages: 2 },
  },
  {
    id: '5',
    title: 'Auberge CK Bangou (Escale Idéale en Bordure de Route)',
    location: 'Bangou (Bagnou - En bordure de route)',
    city: 'Ouest',
    price: '5 000 FCFA / nuitée',
    listingType: 'RENT',
    surface: 35,
    bedrooms: 1,
    imageUrl: bangou1,
    galleryImages: [
      bangou1,
      bangou2,
      bangou3,
    ],
    isDirectCk: true,
    category: 'Auberge de Charme',
    description: 'Auberge CK Bangou située en bordure de route à Bangou (Bagnou). Meilleur rapport qualité-prix : Chambre Simple propre, calme et sécurisée à 5.000 F FCFA la nuitée. Espace surveillé H24 et parking sécurisé pour votre véhicule.',
    features: [
      'Chambre Simple : 5.000 F / nuitée 🛏️',
      'Meilleur rapport Qualité / Prix ⭐️',
      'Sécurité 24h/24 et Espace Surveillé 🛡️',
      'Parking Sécurisé pour votre véhicule 🚗',
      'Propre - Calme - Sécurisé ✨',
      'Emplacement idéal en bordure de route 🛣️',
    ],
    mapCoordinates: { lat: 5.2411, lng: 10.2845, xPercent: 68, yPercent: 28 },
    details: { yearBuilt: 2024, landSurface: 2000, bathrooms: 1, garages: 1 },
  },
  {
    id: '6',
    title: 'Appartement Haut Standing Carrefour Bassong',
    location: 'Logpom (Bassong)',
    city: 'Douala',
    price: '200 000 FCFA / mois',
    listingType: 'RENT',
    surface: 180,
    bedrooms: 3,
    imageUrl: flyer2,
    galleryImages: [
      flyer2,
      flyer1,
      douala3,
      douala1,
    ],
    isDirectCk: true,
    category: 'Appartement Standing',
    description: 'Appartement propre, calme et très confortable situé au Carrefour Bassong à Douala. Salons lumineux, toutes pièces climatisées, cuisine moderne et sécurité garantie.',
    features: ['Toutes pièces climatisées ❄️', 'Salon lumineux', 'Cuisine moderne', 'Sécurité et tranquillité 🛡️', 'Idéal familles et professionnels'],
    mapCoordinates: { lat: 4.0760, lng: 9.7430, xPercent: 32, yPercent: 42 },
    details: { yearBuilt: 2023, landSurface: 250, bathrooms: 2, garages: 1 },
  },
];
