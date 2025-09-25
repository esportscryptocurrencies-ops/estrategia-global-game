import { useState } from 'react';
import { PlayerCard } from '@/types/cards';
import CardComponent from './CardComponent';

interface CardInventoryProps {
  cards: PlayerCard[];
  onUseCard: (cardId: string) => void;
}

export default function CardInventory({ cards, onUseCard }: CardInventoryProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    onUseCard(cardId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Inventario de Tarjetas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <CardComponent 
              card={card} 
              onUse={() => handleCardClick(card.id)}
              disabled={false}
            />
            {card.quantity > 1 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {card.quantity}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}