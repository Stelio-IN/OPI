import React, { useEffect, useState } from 'react';
import axios from 'axios';

const marcasModelos = {
  Toyota: ['Hiace'],
  Nissan: ['Caravan'],
  Mitsubishi: ['L300'],
  Mazda: ['Bongo'],
  Hyundai: ['H-1'],
  Kia: ['Pregio'],
  Ford: ['Transit'],
  Yutong: ['ZK6127H', 'ZK6118HGA'],
  GoldenDragon: ['XML6125', 'XML6907'],
  Scania: ['Touring HD', 'K360'],
  Mercedes: ['OF-1721', 'OF-1418'],
};

const cores = [
  'Branco', 'Preto', 'Prata', 'Cinza', 'Azul', 'Vermelho', 
  'Verde', 'Amarelo', 'Laranja', 'Marrom', 'Dourado', 'Outra'
];

const tiposCombustivel = [
  'Gasolina', 'Diesel', 'Elétrico', 'Híbrido', 'GNV', 'Etanol', 'Outro'
];

function Fleet() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState({
    id_instituicao: '',
    matricula: '',
    marca: '',
    modelo: '',
    ano_fabrico: '',
    capacidade: '',
    tipo_combustivel: '',
    estado_operacional: 'Operacional',
    cor: '',
    observacoes: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gerar anos de fabricação (dos últimos 30 anos até o atual)
  const anosFabrico = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3005/api/veiculo');
      setVeiculos(res.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar veículos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Resetar modelo quando a marca é alterada
    if (name === 'marca') {
      setForm(prev => ({ ...prev, modelo: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put('http://localhost:3005/api/veiculo', {
          ...form,
          id: editingId,
        });
      } else {
        await axios.post('http://localhost:3005/api/veiculo', form);
      }
      resetForm();
      carregarVeiculos();
    } catch (error) {
      setError('Erro ao salvar veículo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      id_instituicao: '',
      matricula: '',
      marca: '',
      modelo: '',
      ano_fabrico: '',
      capacidade: '',
      tipo_combustivel: '',
      estado_operacional: 'Operacional',
      cor: '',
      observacoes: '',
    });
    setEditingId(null);
  };

  const editarVeiculo = (v) => {
    setForm(v);
    setEditingId(v.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const apagarVeiculo = async (id) => {
    if (window.confirm('Deseja realmente apagar este veículo?')) {
      setLoading(true);
      try {
        await axios.delete('http://localhost:3005/api/veiculo', { data: { id } });
        carregarVeiculos();
      } catch (err) {
        setError('Erro ao apagar veículo: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Gerenciamento de Frota
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">ID Instituição</label>
          <input name="id_instituicao" value={form.id_instituicao} onChange={handleChange} required
            placeholder="ID da instituição" className="border p-2 rounded w-full" />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Matrícula</label>
          <input name="matricula" value={form.matricula} onChange={handleChange} required
            placeholder="Matrícula do veículo" className="border p-2 rounded w-full uppercase" />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <select name="marca" value={form.marca} onChange={handleChange} required
            className="border p-2 rounded w-full">
            <option value="">Selecione a Marca</option>
            {Object.keys(marcasModelos).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <select name="modelo" value={form.modelo} onChange={handleChange} required
            disabled={!form.marca} className="border p-2 rounded w-full">
            <option value="">Selecione o Modelo</option>
            {(marcasModelos[form.marca] || []).map((modelo) => (
              <option key={modelo} value={modelo}>{modelo}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Ano de Fabricação</label>
          <select name="ano_fabrico" value={form.ano_fabrico} onChange={handleChange} required
            className="border p-2 rounded w-full">
            <option value="">Selecione o Ano</option>
            {anosFabrico.map((ano) => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Capacidade</label>
          <input name="capacidade" value={form.capacidade} onChange={handleChange} required
            placeholder="Número de passageiros" type="number" min="1"
            className="border p-2 rounded w-full" />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Tipo de Combustível</label>
          <select name="tipo_combustivel" value={form.tipo_combustivel} onChange={handleChange}
            className="border p-2 rounded w-full">
            <option value="">Selecione o Combustível</option>
            {tiposCombustivel.map((comb) => (
              <option key={comb} value={comb}>{comb}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Estado Operacional</label>
          <select name="estado_operacional" value={form.estado_operacional} onChange={handleChange}
            className="border p-2 rounded w-full">
            <option value="Operacional">Operacional</option>
            <option value="Em manutenção">Em manutenção</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Cor</label>
          <select name="cor" value={form.cor} onChange={handleChange}
            className="border p-2 rounded w-full">
            <option value="">Selecione a Cor</option>
            {cores.map((cor) => (
              <option key={cor} value={cor}>{cor}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea name="observacoes" value={form.observacoes} onChange={handleChange}
            placeholder="Observações adicionais" rows="3"
            className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-3 pt-2">
          {editingId && (
            <button type="button" onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
              Cancelar
            </button>
          )}
          <button type="submit" disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              editingId ? 'Atualizar Veículo' : 'Cadastrar Veículo'
            )}
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Lista de Veículos
        <span className="text-sm font-normal ml-2">({veiculos.length} registros)</span>
      </h3>

      {loading && !veiculos.length ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2">Carregando veículos...</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca/Modelo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combustível</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {veiculos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    Nenhum veículo cadastrado
                  </td>
                </tr>
              ) : (
                veiculos.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{v.matricula}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium">{v.marca}</div>
                      <div className="text-sm text-gray-500">{v.modelo}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{v.ano_fabrico}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{v.capacidade}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{v.tipo_combustivel}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${v.estado_operacional === 'Operacional' ? 'bg-green-100 text-green-800' : 
                          v.estado_operacional === 'Em manutenção' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {v.estado_operacional}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => editarVeiculo(v)} 
                        className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                      <button onClick={() => apagarVeiculo(v.id)} 
                        className="text-red-600 hover:text-red-900">Apagar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Fleet;