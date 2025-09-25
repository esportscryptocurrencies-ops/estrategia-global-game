import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { Game, Player, TurnAction } from '@/types/game';
import { assignStartingCards, placeHiddenCards } from './game';
import { COUNTRIES_AND_REGIONS } from '@/data/countries';

export const createNewGame = async (players: Omit<Player, 'country' | 'region' | 'status' | 'cards' | 'position'>[]): Promise<string> => {
  if (players.length !== 193) {
    throw new Error('Se requieren exactamente 193 jugadores');
  }

  // Asignar países aleatorios (1 por jugador)
  const shuffledCountries = [...COUNTRIES_AND_REGIONS].sort(() => 0.5 - Math.random());
  const gamePlayers: Player[] = players.map((player, index) => {
    const countryData = shuffledCountries[index % shuffledCountries.length];
    const country = countryData.country;
    const regions = countryData.regions;
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    return {
      ...player,
      country,
      region,
      status: 'active',
      cards: assignStartingCards().map(card => card.id),
      position: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180
      }
    };
  });

  // Colocar tarjetas escondidas
  const hiddenCards = placeHiddenCards();

  const gameData: Omit<Game, 'id'> = {
    status: 'playing',
    players: gamePlayers,
    currentPlayerIndex: 0,
    currentTurn: 1,
    startTime: new Date(),
    endTime: null,
    prizePool: 0,
    winnerId: null,
    hiddenCards,
    disabledRegions: []
  };

  const gameRef = await addDoc(collection(db, 'games'), {
    ...gameData,
    startTime: serverTimestamp()
  });

  return gameRef.id;
};

export const joinGameLobby = async (userId: string, userName: string, userEmail: string): Promise<string | null> => {
  // Buscar partida en espera con menos de 193 jugadores
  const q = query(
    collection(db, 'gameLobbies'),
    where('status', '==', 'waiting'),
    where('playerCount', '<', 193)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    // Unirse a partida existente
    const lobbyDoc = querySnapshot.docs[0];
    const lobbyData = lobbyDoc.data();
    
    await updateDoc(doc(db, 'gameLobbies', lobbyDoc.id), {
      players: [...(lobbyData.players || []), { id: userId, name: userName, email: userEmail }],
      playerCount: (lobbyData.playerCount || 0) + 1
    });
    
    // Si se completaron 193 jugadores, crear partida
    if ((lobbyData.playerCount || 0) + 1 === 193) {
      const gameId = await createNewGame(lobbyData.players || []);
      await updateDoc(doc(db, 'gameLobbies', lobbyDoc.id), {
        status: 'started',
        gameId
      });
      return gameId;
    }
    
    return lobbyDoc.id;
  } else {
    // Crear nueva partida en espera
    const newLobby = await addDoc(collection(db, 'gameLobbies'), {
      status: 'waiting',
      players: [{ id: userId, name: userName, email: userEmail }],
      playerCount: 1,
      createdAt: serverTimestamp()
    });
    
    return newLobby.id;
  }
};

export const recordTurnAction = async (gameId: string, action: TurnAction) => {
  await addDoc(collection(db, `games/${gameId}/turns`), {
    ...action,
    timestamp: serverTimestamp()
  });
  
  // Actualizar estado del juego si es necesario
  // (aquí iría la lógica de eliminación, uso de tarjetas, etc.)
};