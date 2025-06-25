import React, { useEffect, useState } from 'react';

interface Institution {
  id_instituicao: number;
  nome: string;
  email: string;
  senha: string;
  localizacao: string;
  imagem_url: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Institutions: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/api/instituicoes');
      if (!response.ok) throw new Error('Erro ao buscar instituições');
      const data = await response.json();
      setInstitutions(data);
    } catch (error: any) {
      console.error('Erro ao carregar instituições:', error);
      setError(error.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInstitution(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Instituições</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-6 text-gray-500">Carregando instituições...</div>
        ) : institutions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">Nenhuma instituição cadastrada.</div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Localização</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution) => (
                <tr
                  key={institution.id_instituicao}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{institution.nome}</td>
                  <td className="px-4 py-2">{institution.localizacao}</td>
                  <td className="px-4 py-2">{institution.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(institution)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedInstitution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Detalhes da Instituição</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600">ID</label>
                <p className="text-gray-800">{selectedInstitution.id_instituicao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Nome</label>
                <p className="text-gray-800">{selectedInstitution.nome}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800">{selectedInstitution.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Localização</label>
                <p className="text-gray-800">{selectedInstitution.localizacao}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Imagem URL</label>
                <p className="text-gray-800">{selectedInstitution.imagem_url || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <p className="text-gray-800">{selectedInstitution.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Criado Em</label>
                <p className="text-gray-800">{new Date(selectedInstitution.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Atualizado Em</label>
                <p className="text-gray-800">{new Date(selectedInstitution.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Institutions;