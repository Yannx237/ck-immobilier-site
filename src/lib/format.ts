const fcfa = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

const NARROW_NBSP = String.fromCharCode(0x202f);
const NBSP = String.fromCharCode(0xa0);

// Intl insère des espaces fines insécables : on les remplace par des espaces insécables classiques
// pour un rendu identique quelle que soit la police.
export const formatAmount = (amount: number) => fcfa.format(amount).replaceAll(NARROW_NBSP, NBSP);

// Prix compact pour les pastilles de la carte : 350M, 200k, 5k.
export const formatShortAmount = (amount: number) => {
  if (amount >= 1_000_000) return `${fcfa.format(amount / 1_000_000)}M`;
  if (amount >= 1_000) return `${fcfa.format(amount / 1_000)}k`;
  return fcfa.format(amount);
};
