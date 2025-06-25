import React from 'react';

function Fleet() {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Gerenciamento de Frota
      </h2>
      <p className="text-gray-600 mb-4">
        Esta página permitirá gerenciar todos os veículos da sua frota.
      </p>
      <p className="text-gray-600 mb-4">
        Funcionalidades a serem implementadas:
      </p>
      <ul className="pl-5 list-disc text-gray-600">
        <li className="mb-2">Lista de veículos ativos</li>
        <li className="mb-2">Status de manutenção</li>
        <li className="mb-2">Histórico de rotas</li>
        <li className="mb-2">Estatísticas de pagamentos por veículo</li>
      </ul>
    </div>
  );
}

export default Fleet;
