export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Estrategia Global
        </h1>
        <p className="text-lg text-center mb-8">
          El juego de estrategia con 193 jugadores por partida
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <a
            href="/auth/login"
            className="bg-green-500 text-white text-center py-4 rounded-lg hover:bg-green-600"
          >
            Iniciar Sesión
          </a>
          <a
            href="/auth/register"
            className="bg-blue-500 text-white text-center py-4 rounded-lg hover:bg-blue-600"
          >
            Registrarme
          </a>
          <a
            href="/lobby"
            className="bg-purple-500 text-white text-center py-4 rounded-lg hover:bg-purple-600"
          >
            Entrar al Lobby
          </a>
          <a
            href="/marketplace"
            className="bg-orange-500 text-white text-center py-4 rounded-lg hover:bg-orange-600"
          >
            Marketplace
          </a>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">¿Cómo funciona?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>193 jugadores por partida</li>
            <li>Ubicados en diferentes países</li>
            <li>Turnos con anuncios para financiar premios</li>
            <li>Sistema de tarjetas y estrategia</li>
            <li>Premios para ganadores</li>
          </ul>
        </div>
      </div>
    </div>
  );
}