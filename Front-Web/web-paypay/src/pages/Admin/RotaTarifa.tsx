import React, { useEffect, useState } from 'react';

interface Rota {
  id_rota: number;
  origen: string;
  destino: string;
}

interface Tarifa {
  id_tarifa: number;
  valor: number;
  tipo_cli: string;
}

interface TarifaRota {
  id: number;
  Rota: Rota;
  Tarifa: Tarifa;
  activo: boolean;
}

const RotaTarifa: React.FC = () => {
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [associacoes, setAssociacoes] = useState<TarifaRota[]>([]);
  const [selectedRota, setSelectedRota] = useState<number | null>(null);
  const [selectedTarifa, setSelectedTarifa] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  // Fetch routes
  useEffect(() => {
    fetch('http://localhost:3005/api/rota/all')
      .then((res) => res.json())
      .then((data) => setRotas(data))
      .catch((error) => console.error('Erro ao carregar rotas:', error));
  }, []);

  // Fetch fares
  useEffect(() => {
    fetch('http://localhost:3005/api/tarifa/all')
      .then((res) => res.json())
      .then((data) => setTarifas(data))
      .catch((error) => console.error('Erro ao carregar tarifas:', error));
  }, []);

  // Fetch associations
  const carregarAssociacoes = () => {
    fetch('http://localhost:3005/api/tarifa_rota/all')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Erro: a resposta da API não é um array', data);
          return;
        }
        setAssociacoes(data);
      })
      .catch((error) => console.error('Erro ao carregar associações:', error));
  };

  useEffect(() => {
    carregarAssociacoes();
  }, []);

  // Associate fare with route
  const associarTarifaRota = async () => {
    if (!selectedRota || !selectedTarifa) {
      alert('Selecione uma rota e uma tarifa antes de associar.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/api/tarifa_rota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_rota: selectedRota,
          id_tarifa: selectedTarifa,
          activo: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao associar tarifa e rota');
      }

      const newAssociation = await response.json();
      setAssociacoes([...associacoes, newAssociation]);
      alert('Associação criada com sucesso!');
      
      setSelectedRota(null);
      setSelectedTarifa(null);
      carregarAssociacoes();
      
    } catch (error) {
      console.error(error);
      alert('Erro ao associar tarifa e rota.');
    } finally {
      setLoading(false);
    }
  };

  // Remove association
  const removerAssociacao = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover esta associação?")) {
      return;
    }
  
    setRemovingId(id);
    try {
      const response = await fetch(`http://localhost:3005/api/tarifa_rota/remove/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao remover associação");
      }
  
      alert("Associação removida com sucesso!");
      carregarAssociacoes();
    } catch (error) {
      console.error(error);
      alert("Erro ao remover associação.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800">
      {/* Header */}
      <div className="relative mb-8 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Associação de Rotas e Tarifas</h1>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-indigo-600 to-emerald-500 rounded"></div>
      </div>

      {/* New Association Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Nova Associação</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Route Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Rota:</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              onChange={(e) => setSelectedRota(e.target.value ? Number(e.target.value) : null)}
              value={selectedRota || ""}
            >
              <option value="">Selecione uma rota</option>
              {rotas.map((rota) => (
                <option key={rota.id_rota} value={rota.id_rota}>
                  {rota.origen} → {rota.destino}
                </option>
              ))}
            </select>
          </div>

          {/* Fare Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Tarifa:</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-xs focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              onChange={(e) => setSelectedTarifa(e.target.value ? Number(e.target.value) : null)}
              value={selectedTarifa || ""}
            >
              <option value="">Selecione uma tarifa</option>
              {tarifas.map((tarifa) => (
                <option key={tarifa.id_tarifa} value={tarifa.id_tarifa}>
                  {tarifa.tipo_cli} - {tarifa.valor} MZN
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={associarTarifaRota}
            disabled={loading || !selectedRota || !selectedTarifa}
            className={`flex items-center px-6 py-3 rounded-lg font-medium text-white ${
              loading || !selectedRota || !selectedTarifa
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } transition`}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Associando...' : 'Associar'}
          </button>
        </div>
      </div>

      {/* Existing Associations Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Associações Existentes</h2>
        
        {associacoes.length > 0 ? (
          <div className="overflow-x-auto border border-gray-100 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Cliente</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor (MZN)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {associacoes.map((assoc) => (
                  <tr key={assoc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assoc.Rota?.origen || 'Desconhecido'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assoc.Rota?.destino || 'Desconhecido'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assoc.Tarifa?.tipo_cli || 'Desconhecido'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {assoc.Tarifa?.valor !== undefined ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {assoc.Tarifa.valor.toFixed(2)} MZN
                        </span>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => removerAssociacao(assoc.id)}
                        disabled={removingId === assoc.id}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          removingId === assoc.id
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } transition`}
                      >
                        {removingId === assoc.id ? 'Removendo...' : 'Remover'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium text-gray-500">Nenhuma associação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RotaTarifa;