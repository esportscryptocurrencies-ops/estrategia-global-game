import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc,
  Timestamp 
} from 'firebase/firestore';
import { MarketplaceItem, Transaction } from '@/types/marketplace';

export const createMarketplaceItem = async (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'status'>) => {
  const itemRef = await addDoc(collection(db, 'marketplace'), {
    ...item,
    createdAt: Timestamp.now(),
    status: 'active'
  });
  
  return itemRef.id;
};

export const getActiveMarketplaceItems = async () => {
  const q = query(collection(db, 'marketplace'), where('status', '==', 'active'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as MarketplaceItem[];
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
  const transactionRef = await addDoc(collection(db, 'transactions'), {
    ...transaction,
    createdAt: Timestamp.now()
  });
  
  return transactionRef.id;
};

export const completeAuction = async (itemId: string, winnerId: string, finalPrice: number, sellerId: string) => {
  // Actualizar el item como vendido
  await updateDoc(doc(db, 'marketplace', itemId), {
    status: 'sold',
    highestBidder: winnerId
  });
  
  // Crear transacción
  await createTransaction({
    buyerId: winnerId,
    sellerId,
    itemId,
    amount: finalPrice,
    type: 'auction_win',
    status: 'completed'
  });
};