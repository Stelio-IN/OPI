import React, { useState, useEffect } from 'react';
import { Camera, Save, Edit, X } from 'lucide-react';

interface Instituicao {
  id_instituicao: number;
  nome: string;
  email: string;
  localizacao: string;
  imagem_url: string | null;
  status: string;
}

const Perfil: React.FC = () => {
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Instituicao>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Load institution data from localStorage
    const storedData = localStorage.getItem('instituicao');
    if (storedData) {
      const parsedData: Instituicao = JSON.parse(storedData);
      setInstituicao(parsedData);
      setFormData(parsedData);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({ ...prev, imagem_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const updatedInstituicao = { ...instituicao, ...formData } as Instituicao;
    setInstituicao(updatedInstituicao);
    localStorage.setItem('instituicao', JSON.stringify(updatedInstituicao));
    setEditMode(false);
  };

  if (!instituicao) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Perfil da instituição
        </h2>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Perfil da instituição</h2>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit size={16} />
            Editar Perfil
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            <X size={16} />
            Cancelar
          </button>
        )}
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
                  {previewImage || instituicao.imagem_url ? (
                    <img
                      src={previewImage || instituicao.imagem_url || ''}
                      alt="Logo da instituição"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Sem imagem
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                  <Camera size={20} className="text-blue-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status || 'Activo'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Activo">Ativo</option>
                  <option value="Inactivo">Inativo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Save size={16} />
              Salvar Alterações
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 mb-4">
              {instituicao.imagem_url ? (
                <img
                  src={instituicao.imagem_url}
                  alt="Logo da instituição"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Sem imagem
                </div>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              instituicao.status === 'Activo' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {instituicao.status}
            </span>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome</h3>
              <p className="mt-1 text-lg text-gray-900">{instituicao.nome}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">{instituicao.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Localização</h3>
              <p className="mt-1 text-lg text-gray-900">{instituicao.localizacao}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ID da Instituição</h3>
              <p className="mt-1 text-lg text-gray-900">{instituicao.id_instituicao}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;