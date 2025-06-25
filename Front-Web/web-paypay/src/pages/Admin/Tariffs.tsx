import React, { useState, useEffect } from 'react';

interface Tariff {
  id_tarifa: number;
  valor: number;
  tipo_cli: string;
}

const Tariffs: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<Tariff | null>(null);
  const [newTariff, setNewTariff] = useState({
    valor: '',
    tipo_cli: '',
  });

  useEffect(() => {
    fetchTariffs();
  }, []);

  const fetchTariffs = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/tarifa/all');
      const data = await response.json();
      setTariffs(data);
    } catch (error) {
      console.error('Erro ao buscar tarifas:', error);
    }
  };

  const openModal = (tariff: Tariff | null = null) => {
    if (tariff) {
      setCurrentTariff(tariff);
      setNewTariff({
        valor: tariff.valor.toString(),
        tipo_cli: tariff.tipo_cli,
      });
      setIsEditing(true);
    } else {
      setNewTariff({ valor: '', tipo_cli: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmitTariff = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3005/api/tarifa?id_tarifa=${currentTariff?.id_tarifa}`
      : 'http://localhost:3005/api/tarifa';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: parseFloat(newTariff.valor),
          tipo_cli: newTariff.tipo_cli,
        }),
      });

      if (response.ok) {
        setShowModal(false);
        fetchTariffs();
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar tarifa:', errorData.error);
      }
    } catch (error) {
      console.error('Erro ao salvar tarifa:', error);
    }
  };

  const handleDeleteTariff = async (id_tarifa: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarifa?')) {
      try {
        const response = await fetch(`http://localhost:3005/api/tarifa?id_tarifa=${id_tarifa}`, {
          method: 'DELETE',
        });
        if (response.ok) fetchTariffs();
        else {
          const errorData = await response.json();
          console.error('Erro ao excluir tarifa:', errorData.error);
        }
      } catch (error) {
        console.error('Erro ao excluir tarifa:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTariff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tarifas</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal()}
        >
          + Nova Tarifa
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-600 border-b pb-2 mb-4">
              {isEditing ? 'Editar Tarifa' : 'Cadastrar Nova Tarifa'}
            </h2>
            <form onSubmit={handleSubmitTariff}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Valor (MZN):</label>
                <input
                  type="number"
                  name="valor"
                  value={newTariff.valor}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Tipo de Cliente:</label>
                <select
                  name="tipo_cli"
                  value={newTariff.tipo_cli}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="normal">Normal</option>
                  <option value="estudante">Estudante</option>
                  <option value="idoso">Idoso</option>
                  <option value="deficiente">Deficiente</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
            <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Valor (MZN)</th>
                <th className="px-4 py-2">Tipo de Cliente</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tariffs.length > 0 ? (
                tariffs.map((tariff) => (
                  <tr key={tariff.id_tarifa}>
                    <td className="px-4 py-2">{tariff.id_tarifa}</td>
                    <td className="px-4 py-2">{tariff.valor.toFixed(2)}</td>
                    <td className="px-4 py-2 capitalize">{tariff.tipo_cli}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => openModal(tariff)}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteTariff(tariff.id_tarifa)}
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-500 italic">
                    Nenhuma tarifa cadastrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tariffs;
