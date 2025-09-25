"use client";

import { useState, useEffect } from "react";
import MapComponent from "@/components/Map/MapComponent";

export default function GamePage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "ended">("waiting");

  useEffect(() => {
    // Simulación de carga de jugadores
    const mockPlayers = Array.from({ length: 193 }, (_, i) => ({
      id: i + 1,
      name: `Jugador ${i + 1}`,
      position: { lat: 40 + Math.random(), lng: -74 + Math.random() },
      status: "active",
    }));
    setPlayers(mockPlayers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Estrategia Global</h1>
        <p>Turno: {currentTurn} | Jugadores: {players.length} | Estado: {gameStatus}</p>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-1/4 bg-white p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Jugadores</h2>
          <div className="max-h-96 overflow-y-auto">
            {players.map((player) => (
              <div key={player.id} className="py-2 border-b">
                <p>{player.name}</p>
                <p className="text-sm text-gray-500">Lat: {player.position.lat.toFixed(4)}, Lng: {player.position.lng.toFixed(4)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 relative">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}