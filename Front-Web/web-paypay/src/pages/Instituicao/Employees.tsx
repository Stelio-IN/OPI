import React from 'react';

function Employees() {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Gerenciamento de Funcionários
      </h2>
      <p className="text-gray-600 mb-4">
        Esta página permitirá gerenciar todos os funcionários do sistema.
      </p>
      <p className="text-gray-600 mb-4">
        Funcionalidades a serem implementadas:
      </p>
      <ul className="pl-5 list-disc text-gray-600">
        <li className="mb-2">Lista de funcionários</li>
        <li className="mb-2">Gerenciamento de permissões</li>
        <li className="mb-2">Histórico de atividades</li>
        <li className="mb-2">Avaliação de desempenho</li>
      </ul>
    </div>
  );
}

export default Employees;
