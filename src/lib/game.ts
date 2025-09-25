import { CARDS } from '@/data/cards';
import { PlayerCard } from '@/types/cards';

export const assignStartingCards = (): PlayerCard[] => {
  const startingCards: PlayerCard[] = [];
  const availableCards = [...CARDS];

  // Seleccionar 5 tarjetas aleatorias
  for (let i = 0; i < 5; i++) {
    if (availableCards.length === 0) break;

    // Seleccionar tarjeta aleatoria basada en probabilidad
    const randomIndex = getRandomCardIndex(availableCards);
    const selectedCard = availableCards[randomIndex];

    // Añadir al inventario
    const existingCard = startingCards.find(card => card.id === selectedCard.id);
    if (existingCard) {
      existingCard.quantity += 1;
    } else {
      startingCards.push({ ...selectedCard, quantity: 1 });
    }

    // Remover tarjeta si es única (no se repite)
    if (selectedCard.type === 'unica') {
      availableCards.splice(randomIndex, 1);
    }
  }

  return startingCards;
};

const getRandomCardIndex = (cards: typeof CARDS): number => {
  const totalRarity = cards.reduce((sum, card) => sum + card.rarity, 0);
  const randomValue = Math.random() * totalRarity;
  
  let currentSum = 0;
  for (let i = 0; i < cards.length; i++) {
    currentSum += cards[i].rarity;
    if (randomValue <= currentSum) {
      return i;
    }
  }
  
  return cards.length - 1;
};

export const placeHiddenCards = (regions: number = 2800): { regionId: number; cardId: string }[] => {
  const hiddenCards: { regionId: number; cardId: string }[] = [];
  const rareCards = CARDS.filter(card => card.type === 'rara' || card.type === 'epica');

  // Colocar 5 tarjetas raras en regiones aleatorias
  for (let i = 0; i < 5; i++) {
    const randomRegion = Math.floor(Math.random() * regions) + 1;
    const randomCard = rareCards[Math.floor(Math.random() * rareCards.length)];
    
    hiddenCards.push({
      regionId: randomRegion,
      cardId: randomCard.id
    });
  }

  return hiddenCards;
};