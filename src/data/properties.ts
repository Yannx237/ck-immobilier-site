// Le glob embarque chaque fichier correspondant dans le build, même non affiché :
// on exclut les flyers (dont ceux d'une autre agence) et les photos non rattachées à un bien.
const photos = import.meta.glob<string>(
  [
    '../assets/properties/**/*.jpeg',
    '!../assets/properties/general/WhatsApp Image 2026-07-17 at 18.03.41 (1).jpeg',
    '!../assets/properties/general/WhatsApp Image 2026-07-17 at 18.03.44.jpeg',
    '!../assets/properties/general/WhatsApp Image 2026-07-17 at 18.03.46.jpeg',
    '!../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.42 (1).jpeg',
    '!../assets/properties/chambre_douala/WhatsApp Image 2026-07-17 at 18.03.45 (3).jpeg',
    '!../assets/properties/chambre_douala/WhatsApp Image 2026-07-22 *.jpeg',
    '!../assets/properties/bangou_auberge/WhatsApp Image 2026-07-17 at 18.03.43 (2).jpeg',
  ],
  { eager: true, import: 'default' },
);

const photo = (path: string) => {
  const url = photos[`../assets/properties/${path}`];
  if (!url) throw new Error(`Photo introuvable : ${path}`);
  return url;
};

const gallery = (folder: string, files: string[]) =>
  files.map((file) => photo(`${folder}/WhatsApp Image 2026-${file}.jpeg`));

export type ListingType = 'SALE' | 'RENT' | 'NIGHT';
export type City = 'Douala' | 'Yaoundé' | 'Ouest';

export const LISTING_TYPES: ListingType[] = ['SALE', 'RENT', 'NIGHT'];
export const CITIES: City[] = ['Douala', 'Yaoundé', 'Ouest'];

export interface Property {
  id: string;
  title: string;
  category: string;
  listingType: ListingType;
  /** En FCFA : prix total (vente), par mois (location) ou par nuit (auberge). */
  price: number;
  district: string;
  city: City;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  garages?: number;
  landSurface?: number;
  yearBuilt?: number;
  isExclusive: boolean;
  /** Détails courts affichés sur la carte d'annonce, après les surfaces. */
  highlights: string[];
  description: string;
  features: string[];
  images: string[];
  coordinates: { lat: number; lng: number };
}

const golfGallery = gallery('immeuble_golf', [
  '07-22 at 18.09.43 (1)',
  '07-22 at 18.09.42',
  '07-22 at 18.11.30 (1)',
  '07-22 at 18.11.30',
  '07-22 at 18.09.38',
  '07-22 at 18.09.43 (2)',
  '07-22 at 18.09.41',
  '07-22 at 18.09.39 (1)',
  '07-22 at 18.11.28',
  '07-22 at 18.11.29',
]);

export const properties: Property[] = [
  {
    id: '1',
    title: 'Immeuble CK Golf',
    category: 'Immeuble',
    listingType: 'SALE',
    price: 350_000_000,
    district: 'Golf',
    city: 'Yaoundé',
    surface: 450,
    bedrooms: 5,
    bathrooms: 6,
    garages: 4,
    landSurface: 1200,
    yearBuilt: 2024,
    isExclusive: true,
    highlights: ['terrain 1 200 m²'],
    description:
      "Immeuble récent dans le quartier résidentiel du Golf, à Yaoundé. Finitions soignées, parking privatif et vue dégagée. Le titre foncier a été contrôlé à la conservation foncière ; la copie vous est remise avant toute avance.",
    features: [
      'Gardiennage 24 h/24',
      'Groupe électrogène',
      'Forage',
      'Parking privatif sécurisé',
      'Vue dégagée',
      'Titre foncier contrôlé',
    ],
    images: [...golfGallery, ...gallery('general', ['07-22 at 18.09.43', '07-22 at 18.09.42 (2)'])],
    coordinates: { lat: 3.8912, lng: 11.5243 },
  },
  {
    id: '4',
    title: 'Duplex, Immeuble CK Golf',
    category: 'Duplex',
    listingType: 'RENT',
    price: 350_000,
    district: 'Golf',
    city: 'Yaoundé',
    surface: 290,
    bedrooms: 3,
    bathrooms: 3,
    garages: 2,
    yearBuilt: 2023,
    isExclusive: true,
    highlights: ['terrasse privative'],
    description:
      "Grand duplex dans l'Immeuble CK du quartier Golf. Salons spacieux, cuisine équipée, terrasse privative et garage couvert.",
    features: ['Gardiennage 24 h/24', 'Terrasse privative', 'Cuisine équipée', 'Forage', 'Groupe électrogène', 'Garages couverts'],
    images: [golfGallery[1], golfGallery[2], golfGallery[3], golfGallery[4], golfGallery[6], golfGallery[0]],
    coordinates: { lat: 3.8925, lng: 11.5232 },
  },
  {
    id: '2',
    title: 'Appartement climatisé, Logpom',
    category: 'Appartement',
    listingType: 'RENT',
    price: 200_000,
    district: 'Logpom, Carrefour Bassong',
    city: 'Douala',
    surface: 160,
    bedrooms: 3,
    bathrooms: 2,
    garages: 2,
    yearBuilt: 2024,
    isExclusive: true,
    highlights: ['compteur ENEO individuel'],
    description:
      "Appartement neuf à Logpom, au carrefour Bassong. Toutes les pièces sont climatisées. Chaque logement a sa propre cour fermée, son compteur ENEO prépayé et l'eau courante en continu.",
    features: [
      'Toutes les pièces climatisées',
      'Compteur ENEO prépayé individuel',
      'Eau courante en continu',
      'Cour privative fermée',
      'Parking privé',
      "À quelques mètres de l'axe principal",
    ],
    images: gallery('chambre_douala', [
      '07-17 at 18.03.47',
      '07-17 at 18.03.43',
      '07-17 at 18.03.47 (1)',
      '07-17 at 18.03.44 (1)',
      '07-17 at 18.03.46 (1)',
      '07-17 at 18.03.43 (1)',
      '07-17 at 18.03.42 (2)',
      '07-17 at 18.03.42',
      '07-17 at 18.03.45 (1)',
    ]),
    coordinates: { lat: 4.0754, lng: 9.7421 },
  },
  {
    id: '6',
    title: 'Appartement 3 chambres, Carrefour Bassong',
    category: 'Appartement',
    listingType: 'RENT',
    price: 200_000,
    district: 'Logpom, Carrefour Bassong',
    city: 'Douala',
    surface: 180,
    bedrooms: 3,
    bathrooms: 2,
    garages: 1,
    yearBuilt: 2023,
    isExclusive: true,
    highlights: ['salon lumineux'],
    description:
      'Appartement calme au carrefour Bassong. Salon lumineux, toutes les pièces climatisées, cuisine équipée. Convient aux familles comme aux professionnels.',
    features: ['Toutes les pièces climatisées', 'Salon lumineux', 'Cuisine équipée', 'Quartier calme', 'Parking'],
    images: gallery('general', [
      '07-17 at 18.03.41 (3)',
      '07-17 at 18.03.41',
      '07-17 at 18.03.44 (2)',
      '07-17 at 18.03.41 (2)',
      '07-17 at 18.03.45 (2)',
      '07-17 at 18.03.45',
      '07-17 at 18.03.44 (3)',
    ]),
    coordinates: { lat: 4.076, lng: 9.743 },
  },
  {
    id: '3',
    title: 'Auberge CK Bamena',
    category: 'Auberge',
    listingType: 'NIGHT',
    price: 10_000,
    district: 'Bamena, en bordure de route',
    city: 'Ouest',
    surface: 45,
    bedrooms: 1,
    bathrooms: 1,
    yearBuilt: 2023,
    isExclusive: true,
    highlights: ['chambre simple 10 000 F', 'VIP 15 000 F'],
    description:
      "Auberge en bordure de la route principale à Bamena. Chambre simple à 10 000 FCFA la nuit, chambre VIP à 15 000 FCFA. Cadre calme, propre, surveillé jour et nuit.",
    features: [
      'Chambre simple : 10 000 FCFA / nuit',
      'Chambre VIP : 15 000 FCFA / nuit',
      'Surveillance 24 h/24, 7 j/7',
      'Parking sécurisé',
      'En bordure de route',
    ],
    images: gallery('auberge_bamena', ['07-17 at 18.03.48 (1)']),
    coordinates: { lat: 5.1523, lng: 10.2311 },
  },
  {
    id: '5',
    title: 'Auberge CK Bangou',
    category: 'Auberge',
    listingType: 'NIGHT',
    price: 5_000,
    district: 'Bangou (Bagnou), en bordure de route',
    city: 'Ouest',
    surface: 35,
    bedrooms: 1,
    bathrooms: 1,
    yearBuilt: 2024,
    isExclusive: true,
    highlights: ['chambre simple', 'parking sécurisé'],
    description:
      "Auberge en bordure de route à Bangou (Bagnou). Chambre simple propre et calme à 5 000 FCFA la nuit, douche et WC carrelés. Espace surveillé 24 h/24 et parking pour votre véhicule.",
    features: [
      'Chambre simple : 5 000 FCFA / nuit',
      'Douche et WC carrelés',
      'Espace surveillé 24 h/24',
      'Parking sécurisé',
      'En bordure de route',
    ],
    images: gallery('bangou_auberge', [
      '07-25 at 11.10.47 (1)',
      '07-25 at 11.10.47',
      '07-25 at 11.10.48 (2)',
      '07-25 at 11.10.48 (3)',
      '07-25 at 11.10.48 (1)',
      '07-25 at 11.10.47 (2)',
      '07-25 at 11.10.49 (1)',
      '07-25 at 11.10.49',
    ]),
    coordinates: { lat: 5.2411, lng: 10.2845 },
  },
];

export const getProperty = (id: string | undefined) => properties.find((p) => p.id === id);
