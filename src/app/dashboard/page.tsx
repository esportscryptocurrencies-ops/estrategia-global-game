"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function DashboardPage() {
  const [wallet, setWallet] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserEmail(user.email || "");
        // Aquí cargarías los datos reales del usuario desde Firestore
        // Por ahora usamos datos simulados
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSaveWallet = () => {
    alert(`Wallet guardada: ${wallet}`);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Perfil</h2>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Edad:</strong> 25</p>
        <p><strong>Sexo:</strong> Masculino</p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Wallet</h3>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Dirección de wallet"
              />
              <button
                onClick={handleSaveWallet}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              <p>{wallet || "No registrada"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                {wallet ? "Editar" : "Agregar wallet"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Navegación</h3>
          <div className="space-y-2">
            <a 
              href="/marketplace" 
              className="block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Marketplace
            </a>
            <a 
              href="/lobby" 
              className="block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Entrar al Lobby
            </a>
            {/* Solo visible para el administrador (tu email) */}
            {userEmail === 'e.sports.cryptocurrencies@gmail.com' && (
              <a 
                href="/admin" 
                className="block bg-red-200 text-red-800 py-2 px-4 rounded hover:bg-red-300"
              >
                Panel de Administración
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}