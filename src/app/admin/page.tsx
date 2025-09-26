"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getAdminIncomeSummary, generateCSV, getTransactionsForCSV } from "@/lib/accounting";

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [cardToAssign, setCardToAssign] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [adminIncome, setAdminIncome] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [csvData, setCsvData] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        loadUsers();
        loadAdminIncome();
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadUsers = async () => {
    // Simular carga de usuarios
    const mockUsers = Array.from({ length: 50 }, (_, i) => ({
      id: `user${i + 1}`,
      name: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@example.com`,
      age: 18 + (i % 50),
      gender: i % 2 === 0 ? "Masculino" : "Femenino",
      balance: Math.floor(Math.random() * 1000),
      bannedUntil: null,
      referralCode: `REF${i + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    }));
    setUsers(mockUsers);
  };

  const loadAdminIncome = async () => {
    try {
      const summary = await getAdminIncomeSummary();
      setAdminIncome(summary.totalIncome);
      setTransactionCount(summary.transactionCount);
    } catch (error) {
      console.error("Error al cargar ingresos:", error);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsLoading(true);
      const transactions = await getTransactionsForCSV();
      const csv = generateCSV(transactions);
      setCsvData(csv);
      
      // Descargar archivo CSV
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `transacciones_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert(`CSV exportado con ${transactions.length} transacciones`);
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      alert("Error al exportar CSV");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBanTemporary = async () => {
    if (selectedUsers.length === 0) {
      alert("Selecciona al menos un usuario");
      return;
    }
    
    alert(`Baneo temporal de ${selectedUsers.length} usuarios por 3 horas`);
  };

  const handleBanPermanent = async () => {
    if (selectedUsers.length === 0) {
      alert("Selecciona al menos un usuario");
      return;
    }
    
    if (confirm(`¿Estás seguro de banear permanentemente a ${selectedUsers.length} usuarios?`)) {
      alert(`Baneo permanente de ${selectedUsers.length} usuarios`);
    }
  };

  const handleAssignCard = async () => {
    if (selectedUsers.length === 0 || !cardToAssign) {
      alert("Selecciona usuarios y una tarjeta");
      return;
    }
    
    alert(`Asignando tarjeta "${cardToAssign}" a ${selectedUsers.length} usuarios`);
  };

  const handleSendNotification = async () => {
    if (!notificationMessage.trim()) {
      alert("Ingresa un mensaje");
      return;
    }
    
    const target = selectedUsers.length > 0 ? "specific" : "all";
    alert(`Enviando notificación a ${target === "all" ? "todos los usuarios" : selectedUsers.length + " usuarios"}`);
  };

  const handleDepositFunds = async () => {
    if (selectedUsers.length === 0 || !depositAmount) {
      alert("Selecciona usuarios e ingresa un monto");
      return;
    }
    
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Monto inválido");
      return;
    }
    
    alert(`Depositando ${amount} USDT a ${selectedUsers.length} usuarios`);
  };

  const handleEnrollTournament = async () => {
    if (selectedUsers.length === 0) {
      alert("Selecciona al menos un usuario");
      return;
    }
    
    alert(`Inscribiendo ${selectedUsers.length} usuarios a torneo especial`);
  };

  if (isLoading && !currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        
        {/* Resumen de ingresos */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Resumen Financiero</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded">
              <p className="text-green-800 font-semibold">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-600">{adminIncome.toFixed(2)} USDT</p>
            </div>
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-blue-800 font-semibold">Partidas Completadas</p>
              <p className="text-2xl font-bold text-blue-600">{transactionCount}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <p className="text-purple-800 font-semibold">Ingreso por Partida</p>
              <p className="text-2xl font-bold text-purple-600">$10 USDT</p>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
            >
              Exportar CSV de Transacciones
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de acciones */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Acciones de Administración</h2>
            
            <div className="space-y-4">
              {/* Baneo temporal */}
              <div>
                <button
                  onClick={handleBanTemporary}
                  className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                  disabled={selectedUsers.length === 0}
                >
                  Baneo Temporal (3h)
                </button>
              </div>
              
              {/* Baneo permanente */}
              <div>
                <button
                  onClick={handleBanPermanent}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  disabled={selectedUsers.length === 0}
                >
                  Baneo Permanente
                </button>
              </div>
              
              {/* Asignar tarjeta */}
              <div>
                <input
                  type="text"
                  value={cardToAssign}
                  onChange={(e) => setCardToAssign(e.target.value)}
                  placeholder="ID de tarjeta"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                  onClick={handleAssignCard}
                  className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                  disabled={selectedUsers.length === 0 || !cardToAssign}
                >
                  Asignar Tarjeta
                </button>
              </div>
              
              {/* Enviar notificación */}
              <div>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Mensaje de notificación"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  rows={3}
                />
                <button
                  onClick={handleSendNotification}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  disabled={!notificationMessage.trim()}
                >
                  {selectedUsers.length > 0 ? 'Enviar a Seleccionados' : 'Enviar a Todos'}
                </button>
              </div>
              
              {/* Depositar fondos */}
              <div>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Monto en USDT"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                  onClick={handleDepositFunds}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  disabled={selectedUsers.length === 0 || !depositAmount}
                >
                  Depositar Fondos
                </button>
              </div>
              
              {/* Inscribir a torneo */}
              <div>
                <button
                  onClick={handleEnrollTournament}
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                  disabled={selectedUsers.length === 0}
                >
                  Inscribir a Torneo Especial
                </button>
              </div>
            </div>
          </div>
          
          {/* Lista de usuarios */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Usuarios Registrados ({users.length})
                {selectedUsers.length > 0 && (
                  <span className="ml-2 text-sm text-blue-600">
                    ({selectedUsers.length} seleccionados)
                  </span>
                )}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seleccionar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Saldo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registrado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className={selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                            className="h-4 w-4 text-blue-600"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.balance} USDT</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.createdAt.toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}