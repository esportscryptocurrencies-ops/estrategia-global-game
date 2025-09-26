import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { AdminAction, AdminNotification } from '@/types/admin';

export const banUserTemporary = async (userId: string, hours: number = 3) => {
  const banUntil = new Date();
  banUntil.setHours(banUntil.getHours() + hours);
  
  await updateDoc(doc(db, 'users', userId), {
    bannedUntil: banUntil.toISOString(),
    updatedAt: serverTimestamp()
  });
  
  await logAdminAction('ban-temporal', [userId], { hours, banUntil });
};

export const banUserPermanent = async (userId: string) => {
  await updateDoc(doc(db, 'users', userId), {
    banned: true,
    updatedAt: serverTimestamp()
  });
  
  await logAdminAction('ban-permanent', [userId], {});
};

export const assignCardToUsers = async (userIds: string[], cardId: string) => {
  // Actualizar inventario de cada usuario
  const batch = [];
  for (const userId of userIds) {
    batch.push(
      updateDoc(doc(db, 'users', userId), {
        cards: [...(await getUserCards(userId)), cardId],
        updatedAt: serverTimestamp()
      })
    );
  }
  await Promise.all(batch);
  
  await logAdminAction('assign-card', userIds, { cardId });
};

export const sendNotification = async (message: string, target: 'all' | 'specific', targetUsers?: string[]) => {
  const notification: Omit<AdminNotification, 'id' | 'readBy'> = {
    title: 'Mensaje del Administrador',
    message,
    target,
    targetUsers,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expira en 7 días
  };
  
  await addDoc(collection(db, 'notifications'), {
    ...notification,
    readBy: [],
    createdAt: serverTimestamp()
  });
  
  await logAdminAction('send-notification', targetUsers || ['all'], { message, target });
};

export const depositFunds = async (userIds: string[], amount: number) => {
  const batch = [];
  for (const userId of userIds) {
    batch.push(
      updateDoc(doc(db, 'users', userId), {
        balance: (await getUserBalance(userId)) + amount,
        updatedAt: serverTimestamp()
      })
    );
  }
  await Promise.all(batch);
  
  await logAdminAction('deposit-funds', userIds, { amount });
};

export const enrollUsersInTournament = async (userIds: string[], tournamentId: string) => {
  const batch = [];
  for (const userId of userIds) {
    batch.push(
      updateDoc(doc(db, 'users', userId), {
        tournaments: [...(await getUserTournaments(userId)), tournamentId],
        updatedAt: serverTimestamp()
      })
    );
  }
  await Promise.all(batch);
  
  await logAdminAction('enroll-tournament', userIds, { tournamentId });
};

const logAdminAction = async (actionType: AdminAction['actionType'], targetUsers: string[], details: any) => {
  await addDoc(collection(db, 'adminActions'), {
    adminId: 'current-admin-id', // Aquí iría el ID real del admin
    actionType,
    targetUsers,
    details,
    timestamp: serverTimestamp()
  });
};

// Funciones auxiliares (simuladas)
const getUserCards = async (userId: string) => {
  // Aquí iría la lógica real para obtener tarjetas del usuario
  return [];
};

const getUserBalance = async (userId: string) => {
  // Aquí iría la lógica real para obtener saldo del usuario
  return 0;
};

const getUserTournaments = async (userId: string) => {
  // Aquí iría la lógica real para obtener torneos del usuario
  return [];
};