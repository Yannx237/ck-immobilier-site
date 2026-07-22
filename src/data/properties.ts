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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgSpulC6OctBSdrYtKCA1csxGvPXIz0EPOc9yfUhv_gRLyoGT2lwPA_IjptCbiu2hrr1EOV_rtuKGGbn-Wg4nMCkPKGg3fAsXr5caFVYGASIy8F-N86v1d_ZldRON8__vK1tmZ53--kfuQjzpGWS1i3crWijZngnQl3YzgreTGwMdu77l7-juAk-vPypFzhQBOZIC_WyHTx0SPt7mzvEvHOZG2MJm1coj0D21yIM41f0PqfGbMfUrXfdnwqJdgb2-gqHD29WyEmi',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgSpulC6OctBSdrYtKCA1csxGvPXIz0EPOc9yfUhv_gRLyoGT2lwPA_IjptCbiu2hrr1EOV_rtuKGGbn-Wg4nMCkPKGg3fAsXr5caFVYGASIy8F-N86v1d_ZldRON8__vK1tmZ53--kfuQjzpGWS1i3crWijZngnQl3YzgreTGwMdu77l7-juAk-vPypFzhQBOZIC_WyHTx0SPt7mzvEvHOZG2MJm1coj0D21yIM41f0PqfGbMfUrXfdnwqJdgb2-gqHD29WyEmi',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiatGuxCHIORekehsiuQ1RaoqaC5leNF0LWx3ZTSpU5dwSyX4zF90dy8PkXZ3VfOdC5jd4lRpSLTLGt9C3V0xFr1mF4uXvQD-4sfvMMSweIRYdCQG80M_VwoZiBTSn4mBLkOWVnFI1pEH5scWvjc90uuf9PZftb3VfyJfy5UlDackEbBlUSWWNp1H_DzF3mshAxNraszAdegX9wB4rUZsDELbG62UNuxjG96z2dE3WbFIwCJgh5xL2Aw1wYWtCDeYYm_zlBwwvytmx',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiatGuxCHIORekehsiuQ1RaoqaC5leNF0LWx3ZTSpU5dwSyX4zF90dy8PkXZ3VfOdC5jd4lRpSLTLGt9C3V0xFr1mF4uXvQD-4sfvMMSweIRYdCQG80M_VwoZiBTSn4mBLkOWVnFI1pEH5scWvjc90uuf9PZftb3VfyJfy5UlDackEbBlUSWWNp1H_DzF3mshAxNraszAdegX9wB4rUZsDELbG62UNuxjG96z2dE3WbFIwCJgh5xL2Aw1wYWtCDeYYm_zlBwwvytmx',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiatGuxCHIORekehsiuQ1RaoqaC5leNF0LWx3ZTSpU5dwSyX4zF90dy8PkXZ3VfOdC5jd4lRpSLTLGt9C3V0xFr1mF4uXvQD-4sfvMMSweIRYdCQG80M_VwoZiBTSn4mBLkOWVnFI1pEH5scWvjc90uuf9PZftb3VfyJfy5UlDackEbBlUSWWNp1H_DzF3mshAxNraszAdegX9wB4rUZsDELbG62UNuxjG96z2dE3WbFIwCJgh5xL2Aw1wYWtCDeYYm_zlBwwvytmx',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiatGuxCHIORekehsiuQ1RaoqaC5leNF0LWx3ZTSpU5dwSyX4zF90dy8PkXZ3VfOdC5jd4lRpSLTLGt9C3V0xFr1mF4uXvQD-4sfvMMSweIRYdCQG80M_VwoZiBTSn4mBLkOWVnFI1pEH5scWvjc90uuf9PZftb3VfyJfy5UlDackEbBlUSWWNp1H_DzF3mshAxNraszAdegX9wB4rUZsDELbG62UNuxjG96z2dE3WbFIwCJgh5xL2Aw1wYWtCDeYYm_zlBwwvytmx',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgSpulC6OctBSdrYtKCA1csxGvPXIz0EPOc9yfUhv_gRLyoGT2lwPA_IjptCbiu2hrr1EOV_rtuKGGbn-Wg4nMCkPKGg3fAsXr5caFVYGASIy8F-N86v1d_ZldRON8__vK1tmZ53--kfuQjzpGWS1i3crWijZngnQl3YzgreTGwMdu77l7-juAk-vPypFzhQBOZIC_WyHTx0SPt7mzvEvHOZG2MJm1coj0D21yIM41f0PqfGbMfUrXfdnwqJdgb2-gqHD29WyEmi',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgSpulC6OctBSdrYtKCA1csxGvPXIz0EPOc9yfUhv_gRLyoGT2lwPA_IjptCbiu2hrr1EOV_rtuKGGbn-Wg4nMCkPKGg3fAsXr5caFVYGASIy8F-N86v1d_ZldRON8__vK1tmZ53--kfuQjzpGWS1i3crWijZngnQl3YzgreTGwMdu77l7-juAk-vPypFzhQBOZIC_WyHTx0SPt7mzvEvHOZG2MJm1coj0D21yIM41f0PqfGbMfUrXfdnwqJdgb2-gqHD29WyEmi',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    isDirectCk: true,
    category: 'Loft de Luxe',
    mapCoordinates: { lat: 4.0512, lng: 9.7021, xPercent: 32, yPercent: 42 },
    details: { yearBuilt: 2023, landSurface: 250, bathrooms: 2, garages: 1 },
  },
];
