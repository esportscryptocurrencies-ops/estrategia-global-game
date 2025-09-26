import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  limit,
  startAfter,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { Transaction } from '@/types/marketplace';

// Registrar transacción de partida
export const recordGameTransaction = async (
  gameId: string,
  totalRevenue: number,
  adminFee: number = 10,
  prizePool: number,
  donation: number,
  maintenance: number,
  investment: number
) => {
  const transactions: Transaction[] = [
    {
      id: `admin-${gameId}`,
      buyerId: 'system',
      sellerId: 'admin',
      gameId,
      amount: adminFee,
      type: 'admin_fee',
      description: `Ingresos del administrador por partida ${gameId}`,
      timestamp: new Date(),
      status: 'completed',
      adminFee,
      prizePool: totalRevenue
    },
    {
      id: `prize-${gameId}`,
      buyerId: 'winner',
      sellerId: 'system',
      gameId,
      amount: prizePool,
      type: 'game_prize',
      description: `Premio para ganador de partida ${gameId}`,
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: `donation-${gameId}`,
      buyerId: 'system',
      sellerId: 'ong',
      gameId,
      amount: donation,
      type: 'donation',
      description: `Donación a ONG por partida ${gameId}`,
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: `maintenance-${gameId}`,
      buyerId: 'system',
      sellerId: 'platform',
      gameId,
      amount: maintenance,
      type: 'maintenance',
      description: `Mantenimiento de plataforma por partida ${gameId}`,
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: `investment-${gameId}`,
      buyerId: 'system',
      sellerId: 'investment',
      gameId,
      amount: investment,
      type: 'investment',
      description: `Inversión por partida ${gameId}`,
      timestamp: new Date(),
      status: 'completed'
    }
  ];

  // Guardar todas las transacciones
  const batchPromises = transactions.map(transaction =>
    addDoc(collection(db, 'transactions'), {
      ...transaction,
      timestamp: serverTimestamp()
    })
  );

  await Promise.all(batchPromises);
};

// Obtener transacciones para exportar CSV
export const getTransactionsForCSV = async (startDate?: Date, endDate?: Date, limitCount: number = 1000) => {
  let q = query(
    collection(db, 'transactions'),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  );

  if (startDate && endDate) {
    q = query(
      collection(db, 'transactions'),
      where('timestamp', '>=', startDate),
      where('timestamp', '<=', endDate),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
  }

  const querySnapshot = await getDocs(q);
  const transactions: Transaction[] = [];

  querySnapshot.forEach((doc) => {
    transactions.push({
      id: doc.id,
      ...doc.data()
    } as Transaction);
  });

  return transactions;
};

// Generar CSV desde transacciones
export const generateCSV = (transactions: Transaction[]): string => {
  const headers = [
    'ID',
    'Tipo',
    'Descripción',
    'Monto (USDT)',
    'Comprador ID',
    'Vendedor ID',
    'Partida ID',
    'Item ID',
    'Fecha',
    'Estado',
    'Fee Admin',
    'Total Partida'
  ];

  const rows = transactions.map(tx => [
    tx.id,
    tx.type,
    `"${tx.description}"`,
    tx.amount,
    tx.buyerId,
    tx.sellerId,
    tx.gameId || '',
    tx.itemId || '',
    new Date(tx.timestamp).toISOString(),
    tx.status,
    tx.adminFee || '',
    tx.prizePool || ''
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

// Obtener resumen de ingresos del administrador
export const getAdminIncomeSummary = async (startDate?: Date, endDate?: Date) => {
  let q = query(
    collection(db, 'transactions'),
    where('type', '==', 'admin_fee')
  );

  if (startDate && endDate) {
    q = query(
      collection(db, 'transactions'),
      where('type', '==', 'admin_fee'),
      where('timestamp', '>=', startDate),
      where('timestamp', '<=', endDate)
    );
  }

  const querySnapshot = await getDocs(q);
  let totalIncome = 0;
  const adminTransactions: Transaction[] = [];

  querySnapshot.forEach((doc) => {
    const tx = doc.data() as Transaction;
    totalIncome += tx.amount;
    adminTransactions.push({ id: doc.id, ...tx });
  });

  return {
    totalIncome,
    transactionCount: adminTransactions.length,
    transactions: adminTransactions
  };
};