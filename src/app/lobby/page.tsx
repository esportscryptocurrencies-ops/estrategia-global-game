"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const [players, setPlayers] = useState<number>(0);
  const [isFull, setIsFull] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulación de conexión de jugadores
    const interval = setInterval(() => {
      setPlayers(prev => {
        const newCount = prev < 193 ? prev + 1 : prev;
        setIsFull(newCount === 193);
        
        if (newCount === 193) {
          setTimeout(() => {
            router.push("/game");
          }, 2000);
        }
        
        return newCount;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Lobby de Partida</h1>
        
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-600">{players}/193</p>
          <p className="mt-2">Jugadores conectados</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(players / 193) * 100}%` }}
          ></div>
        </div>

        {isFull ? (
          <div className="text-center">
            <p className="text-green-600 font-bold">¡Partida completa! Iniciando en 2 segundos...</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">Esperando a más jugadores...</p>
          </div>
        )}

        <button 
          onClick={() => router.push("/")}
          className="w-full mt-6 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Salir del lobby
        </button>
      </div>
    </div>
  );
}