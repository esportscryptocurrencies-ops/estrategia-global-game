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
  itemId: string;
  amount: number;
  type: 'purchase' | 'auction_win' | 'gift';
  createdAt: Date;
  status: 'completed' | 'pending' | 'failed';
}