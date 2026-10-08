// Coordonnées de l'agence : source unique pour le header, le footer, les fiches et les formulaires.
export const SITE = {
  name: 'CK Immobilier SARL',
  shortName: 'CK Immobilier',
  email: 'contact@ck-immobilier.cm',
  whatsappNumber: '237678386875',
  phones: [
    { display: '+237 678 38 68 75', tel: '+237678386875' },
    { display: '+237 656 24 20 81', tel: '+237656242081' },
  ],
  zones: ['Douala', 'Yaoundé', 'Ouest'],
  founder: 'Colbert Kouatcho',
} as const;

export const PRIMARY_PHONE = SITE.phones[0];

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
