import { Card } from '@/types/cards';

export const CARDS: Card[] = [
  // 1. Escudo (poder moderado, no tan raro)
  {
    id: 'escudo',
    name: 'Escudo',
    type: 'rara',
    rarity: 8, // reducido de 15 a 8
    description: 'Protege de un ataque. Máximo 2 por partida.',
    effect: 'shield',
    uses: 2
  },
  // 2. Ladrón (poderoso, muy raro)
  {
    id: 'ladron',
    name: 'Ladrón',
    type: 'epica',
    rarity: 3, // reducido de 8 a 3
    description: 'Intercambia una tarjeta aleatoria con otro jugador.',
    effect: 'thief'
  },
  // 3. Mina (moderado, raro)
  {
    id: 'mina',
    name: 'Mina',
    type: 'rara',
    rarity: 5, // reducido de 12 a 5
    description: 'Coloca una mina en una región. Ataca a quien entre.',
    effect: 'mine'
  },
  // 4. K-9 (bajo poder, común)
  {
    id: 'k9',
    name: 'K-9',
    type: 'comun',
    rarity: 15, // reducido de 25 a 15
    description: 'Coloca un perro guardián en una región colindante al enemigo. Revela su ubicación.',
    effect: 'k9'
  },
  // 5. Spam (bajo poder, común)
  {
    id: 'spam',
    name: 'Spam',
    type: 'comun',
    rarity: 12, // reducido de 20 a 12
    description: 'Envía un mensaje a todos los jugadores.',
    effect: 'spam'
  },
  // 6. Alianza (muy poderoso, extremadamente raro)
  {
    id: 'alianza',
    name: 'Alianza',
    type: 'unica',
    rarity: 0.5, // reducido de 2 a 0.5
    description: 'Forma una alianza con un jugador eliminado.',
    effect: 'alliance'
  },
  // 7. Derrocar (poderoso, raro)
  {
    id: 'derrocar',
    name: 'Derrocar',
    type: 'epica',
    rarity: 2, // reducido de 5 a 2
    description: 'Apodérate del territorio del jugador eliminado.',
    effect: 'overthrow'
  },
  // 8. Intervenir-comunicación (moderado, raro)
  {
    id: 'intervenir-comunicacion',
    name: 'Intervenir Comunicación',
    type: 'epica',
    rarity: 1.5, // reducido de 3 a 1.5
    description: 'Escucha conversaciones secretas.',
    effect: 'intercept'
  },
  // 9. Invasión (moderado, raro)
  {
    id: 'invasion',
    name: 'Invasión',
    type: 'rara',
    rarity: 4, // reducido de 10 a 4
    description: 'Puedes moverte libremente entre 2 países.',
    effect: 'invasion'
  },
  // 10. Amnistía-temporal (moderado, raro)
  {
    id: 'amnistia-temporal',
    name: 'Amnistía Temporal',
    type: 'epica',
    rarity: 2.5, // reducido de 6 a 2.5
    description: 'No puedes ser atacado por 3 turnos.',
    effect: 'amnesty'
  },
  // 11. Budu (muy poderoso, extremadamente raro)
  {
    id: 'bodu',
    name: 'Budu',
    type: 'unica',
    rarity: 0.3, // nuevo valor
    description: 'Usa la tarjeta de otro jugador en su contra.',
    effect: 'bodu'
  },
  // 12. Complot (moderado, raro)
  {
    id: 'complot',
    name: 'Complot',
    type: 'rara',
    rarity: 3, // reducido de 7 a 3
    description: 'Forma una alianza secreta con otro jugador.',
    effect: 'conspiracy'
  },
  // 13. Bomba Racimo (poderoso, raro)
  {
    id: 'bomba-racimo',
    name: 'Bomba Racimo',
    type: 'epica',
    rarity: 1.8, // reducido de 4 a 1.8
    description: 'Ataca la región objetivo y sus colindantes.',
    effect: 'cluster-bomb'
  },
  // 14. Señuelo (moderado, raro)
  {
    id: 'senal',
    name: 'Señuelo',
    type: 'rara',
    rarity: 4.5, // reducido de 9 a 4.5
    description: 'Cambia tu posición aleatoriamente al ser atacado.',
    effect: 'decoy'
  },
  // 15. Visión Remota (moderado, raro)
  {
    id: 'vision-remota',
    name: 'Visión Remota',
    type: 'rara',
    rarity: 5, // reducido de 11 a 5
    description: 'Visualiza si hay jugadores en regiones colindantes.',
    effect: 'remote-vision'
  },
  // 16. Nukem (extremadamente poderoso, extremadamente raro)
  {
    id: 'nukem',
    name: 'Nukem',
    type: 'unica',
    rarity: 0.1, // reducido de 1 a 0.1
    description: 'Activa un contador de 5 minutos para eliminar países colindantes.',
    effect: 'nukem',
    uses: 1
  },
  // 17. Baneo (poderoso, raro)
  {
    id: 'baneo',
    name: 'Baneo',
    type: 'epica',
    rarity: 2, // reducido de 5 a 2
    description: 'Inhabilita a un jugador por 2 turnos.',
    effect: 'ban'
  },
  // 18. Homeless (muy poderoso, extremadamente raro)
  {
    id: 'homeless',
    name: 'Homeless',
    type: 'unica',
    rarity: 0.2, // nuevo valor
    description: 'Mueve libremente por todas las regiones.',
    effect: 'homeless'
  },
  // 19. Hacker (poderoso, raro)
  {
    id: 'hacker',
    name: 'Hacker',
    type: 'epica',
    rarity: 1.5, // reducido de 3 a 1.5
    description: 'Roba una tarjeta del inventario de otro jugador.',
    effect: 'hacker'
  },
  // 20. Administrador (extremadamente poderoso, extremadamente raro)
  {
    id: 'administrador',
    name: 'Administrador',
    type: 'unica',
    rarity: 0.05, // reducido de 0.5 a 0.05
    description: 'Visualiza todas las posiciones de los jugadores.',
    effect: 'admin'
  },
  // 21. Pandemia/Confinamiento (poderoso, raro)
  {
    id: 'pandemia',
    name: 'Pandemia',
    type: 'rara',
    rarity: 2.5, // reducido de 6 a 2.5
    description: 'Infecta una región, expandiéndose cada turno.',
    effect: 'pandemic'
  },
  // 22. Venganza/Kamikaze (moderado, raro)
  {
    id: 'venganza',
    name: 'Venganza',
    type: 'epica',
    rarity: 2.2, // reducido de 4 a 2.2
    description: 'Elimina al jugador que te eliminó.',
    effect: 'revenge'
  },
  // 23. Vigilancia (moderado, raro)
  {
    id: 'vigilancia',
    name: 'Vigilancia',
    type: 'rara',
    rarity: 4, // reducido de 8 a 4
    description: 'Recibe notificaciones cuando un jugador entra a una región.',
    effect: 'surveillance'
  },
  // 24. Cara o Cruz (moderado, raro)
  {
    id: 'cara-cruz',
    name: 'Cara o Cruz',
    type: 'rara',
    rarity: 6, // reducido de 10 a 6
    description: 'Evita un ataque con 50% de probabilidad.',
    effect: 'coin-flip'
  },
  // 25. Inmunidad (poderoso, raro)
  {
    id: 'inmunidad',
    name: 'Inmunidad',
    type: 'epica',
    rarity: 2, // reducido de 5 a 2
    description: 'Inmune a ataques y efectos por 3 turnos.',
    effect: 'immunity'
  },
  // 26. Sesé al Fuego (extremadamente poderoso, extremadamente raro)
  {
    id: 'sese-fuego',
    name: 'Sesé al Fuego',
    type: 'unica',
    rarity: 0.1, // reducido de 0.5 a 0.1
    description: 'Todos los jugadores no pueden atacar por 2 turnos.',
    effect: 'ceasefire'
  },
  // 27. Tregua (moderado, raro)
  {
    id: 'tregua',
    name: 'Tregua',
    type: 'rara',
    rarity: 3.5, // reducido de 7 a 3.5
    description: 'Protege automáticamente al ser atacado.',
    effect: 'truce'
  },
  // 28. Rastreador (moderado, raro)
  {
    id: 'rastreador',
    name: 'Rastreador',
    type: 'rara',
    rarity: 4.5, // reducido de 9 a 4.5
    description: 'Visualiza la posición anterior de un jugador.',
    effect: 'tracker'
  },
  // 29. Mapa del Tesoro (moderado, raro)
  {
    id: 'mapa-tesoro',
    name: 'Mapa del Tesoro',
    type: 'unica',
    rarity: 0.8, // reducido de 2 a 0.8
    description: 'Visualiza la ubicación de cofres del tesoro.',
    effect: 'treasure-map'
  },
  // 30. Random (moderado, raro)
  {
    id: 'random',
    name: 'Random',
    type: 'epica',
    rarity: 3, // reducido de 6 a 3
    description: 'Obtén una tarjeta aleatoria.',
    effect: 'random'
  },
  // 31. Flecha India (moderado, raro)
  {
    id: 'flecha-india',
    name: 'Flecha India',
    type: 'rara',
    rarity: 4, // reducido de 8 a 4
    description: 'Ataque aleatorio a cualquier jugador.',
    effect: 'indian-arrow'
  },
  // 32. Fraude (extremadamente poderoso, extremadamente raro)
  {
    id: 'fraude',
    name: 'Fraude',
    type: 'unica',
    rarity: 0.01, // reducido de 0.1 a 0.01
    description: 'Roba una tarjeta del marketplace.',
    effect: 'fraud'
  },
  // 33. Caza Recompensas (moderado, raro)
  {
    id: 'caza-recompensas',
    name: 'Caza Recompensas',
    type: 'epica',
    rarity: 1.8, // reducido de 3 a 1.8
    description: 'Premio por eliminar a jugadores de alto rango.',
    effect: 'bounty-hunter'
  },
  // 34. Desquite (moderado, raro)
  {
    id: 'desquite',
    name: 'Desquite',
    type: 'rara',
    rarity: 2.8, // reducido de 5 a 2.8
    description: 'Obtén la tarjeta que te eliminó.',
    effect: 'retribution'
  },
  // 35. Restauración (poderoso, raro)
  {
    id: 'restauracion',
    name: 'Restauración',
    type: 'epica',
    rarity: 1.8, // reducido de 4 a 1.8
    description: 'Habilita regiones deshabilitadas.',
    effect: 'restoration'
  }
];