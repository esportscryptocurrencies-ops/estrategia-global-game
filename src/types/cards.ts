export interface Card {
  id: string;
  name: string;
  type: 'comun' | 'rara' | 'epica' | 'unica';
  rarity: number; // 1-100%
  description: string;
  effect: string;
  uses?: number; // para tarjetas con límite de uso
  cooldown?: number; // turnos de espera
}

export interface PlayerCard extends Card {
  quantity: number;
}