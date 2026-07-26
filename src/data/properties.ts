// Import local property assets
import golf1 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.09.38.jpeg';
import golf2 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.09.43 (1).jpeg';
import golf3 from '../assets/properties/immeuble_golf/WhatsApp Image 2026-07-22 at 18.11.30.jpeg';

import douala1 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.42 (1).jpeg';
import douala2 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.45 (3).jpeg';
import douala3 from '../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.47.jpeg';

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
    title: 'Palais des Ambassadeurs',
    location: 'Bastos',
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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    isDirectCk: true,
    category: 'Villa Contemporaine',
    mapCoordinates: { lat: 3.8864, lng: 11.5167, xPercent: 55, yPercent: 35 },
    details: { yearBuilt: 2024, landSurface: 1200, bathrooms: 6, garages: 4 },
  },
  {
    id: '2',
    title: 'Penthouse Panoramique Bonanjo',
    location: 'Bonanjo',
    city: 'Douala',
    price: '450 000 FCFA / mois',
    listingType: 'RENT',
    surface: 320,
    bedrooms: 4,
    imageUrl: douala1,
    galleryImages: [
      douala1,
      douala2,
      douala3,
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    isDirectCk: true,
    category: 'Appartement de Prestige',
    mapCoordinates: { lat: 4.0435, lng: 9.6894, xPercent: 35, yPercent: 48 },
    details: { yearBuilt: 2023, landSurface: 400, bathrooms: 4, garages: 2 },
  },
  {
    id: '3',
    title: 'Résidence Privée Njo-Njo',
    location: 'Bonapriso',
    city: 'Douala',
    price: '185 000 000 FCFA',
    listingType: 'SALE',
    surface: 380,
    bedrooms: 4,
    imageUrl: bamena1,
    galleryImages: [
      bamena1,
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    ],
    isDirectCk: true,
    category: 'Villa Moderne',
    mapCoordinates: { lat: 4.0321, lng: 9.6987, xPercent: 40, yPercent: 52 },
    details: { yearBuilt: 2025, landSurface: 850, bathrooms: 5, garages: 3 },
  },
  {
    id: '4',
    title: 'Duplex Exclusif Golfe',
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
    isDirectCk: false,
    category: 'Duplex Haut Standing',
    mapCoordinates: { lat: 3.8912, lng: 11.5243, xPercent: 62, yPercent: 32 },
    details: { yearBuilt: 2022, landSurface: 350, bathrooms: 3, garages: 2 },
  },
  {
    id: '5',
    title: 'Domaine Santa Barbara',
    location: 'Santa Barbara',
    city: 'Yaoundé',
    price: '280 000 000 FCFA',
    listingType: 'SALE',
    surface: 520,
    bedrooms: 6,
    imageUrl: bangou1,
    galleryImages: [
      bangou1,
      bangou2,
      bangou3,
    ],
    isDirectCk: true,
    category: 'Propriété d\'Exception',
    mapCoordinates: { lat: 3.9056, lng: 11.5301, xPercent: 68, yPercent: 28 },
    details: { yearBuilt: 2024, landSurface: 1500, bathrooms: 7, garages: 5 },
  },
  {
    id: '6',
    title: 'Loft Vue Fleuve Wouri',
    location: 'Akwa',
    city: 'Douala',
    price: '250 000 FCFA / mois',
    listingType: 'RENT',
    surface: 210,
    bedrooms: 2,
    imageUrl: douala3,
    galleryImages: [
      douala3,
      douala1,
      douala2,
    ],
    isDirectCk: true,
    category: 'Loft de Luxe',
    mapCoordinates: { lat: 4.0512, lng: 9.7021, xPercent: 32, yPercent: 42 },
    details: { yearBuilt: 2023, landSurface: 250, bathrooms: 2, garages: 1 },
  },
];
