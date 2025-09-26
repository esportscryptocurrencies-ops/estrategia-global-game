import { Card } from './cards';

export interface MarketplaceItem {
  id: string;
  sellerId: string;
  cardId: string;
  card: Card;
  price: number; // en USDT
  type: 'sale' | 'auction';
  createdAt: Date;
  endsAt?: Date; // solo para subastas
  highestBid?: number;
  highestBidder?: string;
  status: 'active' | 'sold' | 'expired' | 'cancelled';
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  itemId?: string;
  gameId?: string;
  amount: number;
  type: 'purchase' | 'auction_win' | 'gift' | 'game_prize' | 'admin_fee' | 'donation' | 'maintenance' | 'investment';
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  adminFee?: number; // Solo para transacciones de partida
  prizePool?: number; // Solo para transacciones de partida
}