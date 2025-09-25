"use client";

import { useState, useEffect } from "react";
import { Card } from "@/types/cards";
import { MarketplaceItem } from "@/types/marketplace";

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [userBalance, setUserBalance] = useState(100); // Simulación
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'my-items'>('buy');

  // Simular carga de items del marketplace
  useEffect(() => {
    const mockItems: MarketplaceItem[] = [
      {
        id: '1',
        sellerId: 'user123',
        cardId: 'escudo',
        card: {
          id: 'escudo',
          name: 'Escudo',
          type: 'rara',
          rarity: 8,
          description: 'Protege de un ataque. Máximo 2 por partida.',
          effect: 'shield',
          uses: 2
        },
        price: 5,
        type: 'sale',
        createdAt: new Date(),
        status: 'active'
      },
      {
        id: '2',
        sellerId: 'user456',
        cardId: 'nukem',
        card: {
          id: 'nukem',
          name: 'Nukem',
          type: 'unica',
          rarity: 0.1,
          description: 'Activa un contador de 5 minutos para eliminar países colindantes.',
          effect: 'nukem',
          uses: 1
        },
        price: 50,
        type: 'auction',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // hace 12 horas
        endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // en 12 horas
        highestBid: 45,
        highestBidder: 'user789',
        status: 'active'
      }
    ];
    setItems(mockItems);
  }, []);

  const handleBuy = (itemId: string, price: number) => {
    if (userBalance < price) {
      alert("Saldo insuficiente");
      return;
    }
    
    alert(`Comprando item ${itemId} por ${price} USDT`);
    setUserBalance(prev => prev - price);
  };

  const handleBid = (itemId: string, currentPrice: number) => {
    const bid = prompt(`Ingresa tu oferta (mínimo: ${currentPrice + 1})`);
    const bidAmount = parseInt(bid || '0');
    
    if (bidAmount > currentPrice && userBalance >= bidAmount) {
      alert(`Oferta de ${bidAmount} USDT realizada`);
      setUserBalance(prev => prev - bidAmount);
    } else {
      alert("Oferta inválida o saldo insuficiente");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-2 font-medium ${activeTab === 'buy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Comprar
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-4 py-2 font-medium ${activeTab === 'sell' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Vender/Subastar
          </button>
          <button
            onClick={() => setActiveTab('my-items')}
            className={`px-4 py-2 font-medium ${activeTab === 'my-items' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Mis Items
          </button>
        </div>

        {/* Saldo del usuario */}
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-800 font-semibold">Saldo: {userBalance} USDT</p>
        </div>

        {/* Contenido según la pestaña */}
        {activeTab === 'buy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{item.card.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.card.type === 'comun' ? 'bg-gray-200 text-gray-800' :
                    item.card.type === 'rara' ? 'bg-blue-200 text-blue-800' :
                    item.card.type === 'epica' ? 'bg-purple-200 text-purple-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {item.card.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.card.description}</p>
                
                <div className="mb-3">
                  <p className="font-semibold">
                    {item.type === 'sale' ? 'Precio:' : 'Oferta más alta:'}
                    <span className="text-green-600 ml-2">{item.type === 'sale' ? item.price : item.highestBid} USDT</span>
                  </p>
                  {item.type === 'auction' && item.endsAt && (
                    <p className="text-sm text-gray-500">
                      Termina en: {Math.ceil((item.endsAt.getTime() - Date.now()) / (1000 * 60 * 60))} horas
                    </p>
                  )}
                </div>

                {item.type === 'sale' ? (
                  <button
                    onClick={() => handleBuy(item.id, item.price)}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    Comprar ahora
                  </button>
                ) : (
                  <button
                    onClick={() => handleBid(item.id, item.highestBid || 0)}
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                  >
                    Hacer oferta
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Vender o Subastar Tarjeta</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Seleccionar tarjeta</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Escudo</option>
                  <option>Mina</option>
                  <option>K-9</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Tipo de venta</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="type" value="sale" className="mr-2" defaultChecked />
                    Venta directa
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="auction" className="mr-2" />
                    Subasta (24h)
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Precio (USDT)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ingresa el precio"
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              >
                Publicar
              </button>
            </form>
          </div>
        )}

        {activeTab === 'my-items' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Mis Items en Venta</h2>
            <p className="text-gray-500">No tienes items en venta actualmente.</p>
          </div>
        )}
      </div>
    </div>
  );
}