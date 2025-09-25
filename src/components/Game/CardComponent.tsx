import { Card } from '@/types/cards';

interface CardProps {
  card: Card;
  onUse?: () => void;
  disabled?: boolean;
}

export default function CardComponent({ card, onUse, disabled }: CardProps) {
  const getCardColor = () => {
    switch (card.type) {
      case 'comun': return 'bg-gray-200 border-gray-400';
      case 'rara': return 'bg-blue-200 border-blue-400';
      case 'epica': return 'bg-purple-200 border-purple-400';
      case 'unica': return 'bg-yellow-200 border-yellow-400';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div 
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${getCardColor()} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
      onClick={onUse && !disabled ? onUse : undefined}
    >
      <h3 className="font-bold text-lg">{card.name}</h3>
      <p className="text-sm text-gray-600">{card.description}</p>
      <div className="mt-2 text-xs">
        <span className="bg-white px-2 py-1 rounded">
          {card.type} ({card.rarity}%)
        </span>
      </div>
    </div>
  );
}