import React from 'react';

function DashboardHome() {
  return (
    <div>
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="text-2xl font-bold text-gray-800 mb-2">156</div>
          <div className="text-sm text-gray-500">Veículos ativos</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="text-2xl font-bold text-gray-800 mb-2">3.452</div>
          <div className="text-sm text-gray-500">Transações hoje</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="text-2xl font-bold text-gray-800 mb-2">R$ 14.389</div>
          <div className="text-sm text-gray-500">Receita diária</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="text-2xl font-bold text-gray-800 mb-2">98.2%</div>
          <div className="text-sm text-gray-500">Taxa de sucesso</div>
        </div>
      </div>

      {/* Atividade Recente */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h3>
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-3">
            <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800 mb-1">Nova transação QR code - Linha 553</div>
              <div className="text-xs text-gray-400">Há 5 minutos</div>
            </div>
          </li>

          <li className="flex items-center py-3">
            <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800 mb-1">Alerta - Veículo 345 fora da rota</div>
              <div className="text-xs text-gray-400">Há 15 minutos</div>
            </div>
          </li>

          <li className="flex items-center py-3">
            <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-800 mb-1">Veículo 287 entrou em manutenção</div>
              <div className="text-xs text-gray-400">Há 1 hora</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;
