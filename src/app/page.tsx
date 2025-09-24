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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
}