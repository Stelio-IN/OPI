import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { FaCar, FaRoute, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

function FleetTarif() {
  const [veiculoTarifaRotas, setVeiculoTarifaRotas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [formData, setFormData] = useState({ id_veiculo: '', id_rota: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar todas as associações, veículos e rotas
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [veiculosRes, rotasRes, assocRes] = await Promise.all([
        axios.get('http://localhost:3005/api/veiculo'),
        axios.get('http://localhost:3005/api/rota/all'),
        axios.get('http://localhost:3005/api/veiculoRota')
      ]);
      setVeiculos(veiculosRes.data);
      setRotas(rotasRes.data);
      setVeiculoTarifaRotas(assocRes.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Lidar com mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
    setSuccess(null);
  };

  // Criar ou atualizar associação
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:3005/api/veiculoRota?id_veiculo_tarifa_rota=${editingId}`, formData);
        setSuccess('Associação atualizada com sucesso!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3005/api/veiculoRota', formData);
        setSuccess('Associação criada com sucesso!');
      }
      setFormData({ id_veiculo: '', id_rota: '' });
      fetchData();
    } catch (err) {
      setError('Erro ao salvar associação: ' + err.response?.data?.details || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Iniciar edição
  const handleEdit = (vtr) => {
    setEditingId(vtr.id_veiculo_tarifa_rota);
    setFormData({ id_veiculo: vtr.id_veiculo, id_rota: vtr.id_rota });
    setError(null);
    setSuccess(null);
  };

  // Deletar associação
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3005/api/veiculoRota?id_veiculo_tarifa_rota=${id}`);
      setSuccess('Associação deletada com sucesso!');
      fetchData();
    } catch (err) {
      setError('Erro ao deletar associação: ' + err.response?.data?.details || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obter nome do veículo
  const getVeiculoNome = (id) => {
    const veiculo = veiculos.find(v => v.id_veiculo === id);
    return veiculo ? `${veiculo.marca} ${veiculo.modelo} (${veiculo.matricula})` : 'Desconhecido';
  };

  // Obter detalhes da rota
  const getRotaDetalhes = (id) => {
    const rota = rotas.find(r => r.id_rota === id);
    return rota ? `${rota.origen} → ${rota.destino}` : 'Desconhecida';
  };

  return (
    <div className="bg-white text-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-400 mb-6">
          {editingId ? 'Editar Associação Veículo-Rota' : 'Criar Associação Veículo-Rota'}
        </h2>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg max-w-lg mx-auto"
          aria-label="Formulário de Associação Veículo-Rota"
        >
          <div className="mb-4">
            <label className="block text-teal-300 mb-2" htmlFor="id_veiculo">
              <FaCar className="inline mr-2" /> Veículo
            </label>
            <select
              id="id_veiculo"
              name="id_veiculo"
              value={formData.id_veiculo}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-teal-500"
              required
              aria-required="true"
            >
              <option value="">Selecione um veículo</option>
              {veiculos.map(veiculo => (
                <option key={veiculo.id_veiculo} value={veiculo.id_veiculo}>
                  {veiculo.marca} {veiculo.modelo} ({veiculo.matricula})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-teal-300 mb-2" htmlFor="id_rota">
              <FaRoute className="inline mr-2" /> Rota
            </label>
            <select
              id="id_rota"
              name="id_rota"
              value={formData.id_rota}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-teal-500"
              required
              aria-required="true"
            >
              <option value="">Selecione uma rota</option>
              {rotas.map(rota => (
                <option key={rota.id_rota} value={rota.id_rota}>
                  {rota.origen} → {rota.destino}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 p-3 rounded bg-teal-500 text-white hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={editingId ? 'Atualizar associação' : 'Criar associação'}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : (
                <>
                  <FaCheck className="inline mr-2" />
                  {editingId ? 'Atualizar' : 'Criar'}
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ id_veiculo: '', id_rota: '' });
                  setError(null);
                  setSuccess(null);
                }}
                className="flex-1 p-3 rounded bg-gray-600 text-white hover:bg-gray-700 transition"
                aria-label="Cancelar edição"
              >
                <FaTimes className="inline mr-2" />
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Mensagens de feedback */}
        {success && (
          <div className="bg-green-600 text-white p-3 rounded mb-6 text-center" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-6 text-center" role="alert">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center py-5">
            <svg className="animate-spin h-8 w-8 mx-auto text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        )}

        {/* Lista de associações */}
        {!loading && veiculoTarifaRotas.length === 0 && (
          <p className="text-gray-400 text-center">Nenhuma associação encontrada.</p>
        )}
        {!loading && veiculoTarifaRotas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veiculoTarifaRotas.map((vtr) => (
              <div
                key={vtr.id_veiculo_tarifa_rota}
                className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow"
                role="region"
                aria-label={`Associação ${vtr.id_veiculo_tarifa_rota}`}
              >
                <h3 className="text-lg font-semibold text-teal-300 mb-3">
                  Associação #{vtr.id_veiculo_tarifa_rota}
                </h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Veículo:</span> {getVeiculoNome(vtr.id_veiculo)}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Rota:</span> {getRotaDetalhes(vtr.id_rota)}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Partida:</span> {vtr.partida}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Destino:</span> {vtr.destino}
                </p>
                <p className="text-gray-300 mb-4">
                  <span className="font-medium">Tarifa:</span> {vtr.tarifa?.toFixed(2)}
                </p>
                <div className="flex justify-center mb-4">
                  {vtr.qrcode && <QRCode value={vtr.qrcode} size={120} bgColor="#1F2937" fgColor="#E5E7EB" />}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(vtr)}
                    className="flex-1 p-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
                    aria-label={`Editar associação ${vtr.id_veiculo_tarifa_rota}`}
                    title="Editar"
                  >
                    <FaEdit className="inline mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(vtr.id_veiculo_tarifa_rota)}
                    className="flex-1 p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    aria-label={`Deletar associação ${vtr.id_veiculo_tarifa_rota}`}
                    title="Deletar"
                  >
                    <FaTrash className="inline mr-2" />
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FleetTarif;