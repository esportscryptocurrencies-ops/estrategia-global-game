export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  target: 'all' | 'specific' | 'tournament';
  targetUsers?: string[]; // IDs de usuarios específicos
  createdAt: Date;
  expiresAt?: Date;
  readBy: string[]; // IDs de usuarios que ya leyeron
}

export interface AdminAction {
  id: string;
  adminId: string;
  actionType: 'ban-temporal' | 'ban-permanent' | 'assign-card' | 'send-notification' | 'deposit-funds' | 'enroll-tournament';
  targetUsers: string[];
  details: any; // Datos específicos según la acción
  timestamp: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prizePool: number;
  participants: string[];
  status: 'upcoming' | 'active' | 'completed';
}