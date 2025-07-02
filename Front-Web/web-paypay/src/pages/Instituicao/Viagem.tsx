import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

function Viagem() {
  const [viagens, setViagens] = useState([]);
  const [veiculoRotas, setVeiculoRotas] = useState([]);
  const [formData, setFormData] = useState({
    id_veiculo_tarifa_rota: '',
    status: 'Planejada',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedViagem, setSelectedViagem] = useState(null);
  const [pagamentosPorViagem, setPagamentosPorViagem] = useState({});

  // Buscar dados iniciais
  useEffect(() => {
    fetchDados();
  }, []);

  // Carregar pagamentos quando selecionar uma viagem
  useEffect(() => {
    if (selectedViagem) {
      // Só carrega se ainda não foi carregado ou se os dados estão desatualizados
      if (!pagamentosPorViagem[selectedViagem]) {
        carregarPagamentos(selectedViagem);
      }
    } else {
      // Limpa os pagamentos quando nenhuma viagem está selecionada
      setPagamentosPorViagem({});
    }
  }, [selectedViagem]);

  const fetchDados = async () => {
    setLoading(true);
    try {
      const [viagensRes, veiculoRotasRes] = await Promise.all([
        axios.get('http://localhost:3005/api/viagem'),
        axios.get('http://localhost:3005/api/veiculoRota'),
      ]);

      const viagensOrdenadas = viagensRes.data.sort((a, b) => {
        if (a.status === 'Em andamento') return -1;
        if (b.status === 'Em andamento') return 1;
        if (a.status === 'Planejada') return -1;
        if (b.status === 'Planejada') return 1;
        return 0;
      });

      setViagens(viagensOrdenadas);
      setVeiculoRotas(veiculoRotasRes.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const carregarPagamentos = async (idViagem) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/pagamento?id_viagem=${idViagem}`);
      console.log(`Pagamentos carregados para id_viagem ${idViagem}:`, response.data); // Depuração
      setPagamentosPorViagem((prev) => ({
        ...prev,
        [idViagem]: response.data.filter((p) => p.id_viagem === idViagem) || [], // Filtra explicitamente
      }));
    } catch (err) {
      setError('Erro ao carregar pagamentos: ' + err.message);
      console.error('Erro ao carregar pagamentos:', err); // Depuração
    }
  };

  // Verificar se veículo já tem viagem em andamento
  const veiculoTemViagemAtiva = (idVeiculo) => {
    return viagens.some((v) => {
      const veiculoRota = veiculoRotas.find(
        (vr) => vr.id_veiculo_tarifa_rota === v.id_veiculo_tarifa_rota
      );
      return (
        veiculoRota &&
        veiculoRota.Veiculo.id_veiculo === idVeiculo &&
        v.status === 'Em andamento'
      );
    });
  };

  // Criar nova viagem com validações
  const criarViagem = async () => {
    try {
      const veiculoRotaSelecionada = veiculoRotas.find(
        (vr) => vr.id_veiculo_tarifa_rota === parseInt(formData.id_veiculo_tarifa_rota)
      );

      if (!veiculoRotaSelecionada) {
        throw new Error('Veículo/Rota não encontrado');
      }

      if (veiculoTemViagemAtiva(veiculoRotaSelecionada.Veiculo.id_veiculo)) {
        throw new Error(
          'Este veículo já possui uma viagem em andamento. Finalize-a antes de iniciar outra.'
        );
      }

      const dadosViagem = {
        ...formData,
        data_inicio: new Date().toISOString(),
      };

      const response = await axios.post('http://localhost:3005/api/viagem', dadosViagem);
      setViagens([...viagens, response.data]);
      setFormData({ id_veiculo_tarifa_rota: '', status: 'Planejada' });
      setError(null);
      fetchDados();
    } catch (err) {
      setError(err.message);
    }
  };

  // Atualizar status da viagem com validações
  const atualizarStatus = async (id, novoStatus) => {
    try {
      const viagem = viagens.find((v) => v.id_viagem === id);
      if (!viagem) throw new Error('Viagem não encontrada');

      if (novoStatus === 'Cancelada' && viagem.status === 'Concluída') {
        throw new Error('Viagens concluídas não podem ser canceladas');
      }

      const dadosAtualizacao = { status: novoStatus };

      if (novoStatus === 'Concluída') {
        dadosAtualizacao.data_fim = new Date().toISOString();
      }

      await axios.put(`http://localhost:3005/api/viagem?id_viagem=${id}`, dadosAtualizacao);
      fetchDados();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Deletar viagem com validações
  const deletarViagem = async (id) => {
    try {
      const viagem = viagens.find((v) => v.id_viagem === id);
      if (!viagem) throw new Error('Viagem não encontrada');

      if (viagem.status === 'Concluída') {
        throw new Error('Viagens concluídas não podem ser deletadas');
      }

      await axios.delete(`http://localhost:3005/api/viagem?id_viagem=${id}`);
      setViagens(viagens.filter((v) => v.id_viagem !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Formatar data
  const formatarData = (dataString) => {
    if (!dataString) return 'Em andamento';
    const data = new Date(dataString);
    return data.toLocaleString('pt-MZ');
  };

  // Formatar moeda
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 max-w-6xl mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Gerenciamento de Viagens</h2>

      {error && <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>}

      {/* Formulário para criar viagem */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="font-semibold mb-3">Criar Nova Viagem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Veículo/Rota</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.id_veiculo_tarifa_rota}
              onChange={(e) =>
                setFormData({ ...formData, id_veiculo_tarifa_rota: e.target.value })
              }
            >
              <option value="">Selecione uma opção</option>
              {veiculoRotas.map((vr) => {
                const veiculoEmUso = veiculoTemViagemAtiva(vr.Veiculo.id_veiculo);
                return (
                  <option
                    key={vr.id_veiculo_tarifa_rota}
                    value={vr.id_veiculo_tarifa_rota}
                    disabled={veiculoEmUso}
                  >
                    {vr.Veiculo.marca} {vr.Veiculo.modelo} ({vr.Veiculo.matricula}) -{' '}
                    {vr.Rotum.origen} → {vr.Rotum.destino}
                    {veiculoEmUso && ' (Viagem em andamento)'}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          onClick={criarViagem}
          disabled={!formData.id_veiculo_tarifa_rota || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Criando...' : 'Criar Viagem'}
        </button>
      </div>

      {/* Lista de viagens */}
      <div>
        <h3 className="font-semibold mb-3">Viagens</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : viagens.length === 0 ? (
          <p>Nenhuma viagem cadastrada</p>
        ) : (
          <div className="space-y-4">
            {viagens.map((viagem) => {
              const veiculoRota = veiculoRotas.find(
                (vr) => vr.id_veiculo_tarifa_rota === viagem.id_veiculo_tarifa_rota
              );

              return (
                <div
                  key={viagem.id_viagem}
                  className={`border rounded-lg p-4 ${
                    viagem.status === 'Em andamento'
                      ? 'bg-blue-50'
                      : viagem.status === 'Concluída'
                      ? 'bg-green-50'
                      : ''
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Informações do veículo */}
                    <div>
                      <h4 className="font-medium">Veículo</h4>
                      {veiculoRota && (
                        <>
                          <p>
                            {veiculoRota.Veiculo.marca} {veiculoRota.Veiculo.modelo}
                          </p>
                          <p>Matrícula: {veiculoRota.Veiculo.matricula}</p>
                          <p>Capacidade: {veiculoRota.Veiculo.capacidade} passageiros</p>
                        </>
                      )}
                    </div>

                    {/* Informações da rota */}
                    <div>
                      <h4 className="font-medium">Rota</h4>
                      {veiculoRota && (
                        <>
                          <p>
                            {veiculoRota.Rotum.origen} → {veiculoRota.Rotum.destino}
                          </p>
                          <p>Distância: {veiculoRota.Rotum.distancia} km</p>
                          <p>Tarifa: {formatarMoeda(veiculoRota.tarifa)}</p>
                        </>
                      )}
                    </div>

                    {/* Status e ações */}
                    <div>
                      <h4 className="font-medium">Status</h4>
                      <p className="mb-2">
                        <span
                          className={`font-semibold ${
                            viagem.status === 'Em andamento'
                              ? 'text-blue-600'
                              : viagem.status === 'Concluída'
                              ? 'text-green-600'
                              : ''
                          }`}
                        >
                          {viagem.status}
                        </span>{' '}
                        <br />
                        Início: {formatarData(viagem.data_inicio)} <br />
                        Fim: {formatarData(viagem.data_fim)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {viagem.status === 'Planejada' && (
                          <>
                            <button
                              onClick={() => atualizarStatus(viagem.id_viagem, 'Em andamento')}
                              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            >
                              Iniciar Viagem
                            </button>
                            <button
                              onClick={() => deletarViagem(viagem.id_viagem)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                        {viagem.status === 'Em andamento' && (
                          <button
                            onClick={() => atualizarStatus(viagem.id_viagem, 'Concluída')}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Finalizar Viagem
                          </button>
                        )}
                        {viagem.status === 'Concluída' && (
                          <span className="text-sm text-gray-500">Viagem finalizada</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* QR Code e detalhes adicionais */}
                  {veiculoRota && (
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">QR Code da Rota</h4>
                        <div className="border p-2 inline-block">
                          <QRCode value={veiculoRota.qrcode} size={80} />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedViagem(
                            selectedViagem === viagem.id_viagem ? null : viagem.id_viagem
                          );
                          // Forçar recarregamento dos pagamentos ao selecionar
                          if (selectedViagem !== viagem.id_viagem) {
                            carregarPagamentos(viagem.id_viagem);
                          }
                        }}
                        className="text-blue-500 text-sm"
                      >
                        {selectedViagem === viagem.id_viagem
                          ? 'Ocultar pagamentos'
                          : 'Ver pagamentos'}
                      </button>
                    </div>
                  )}

                  {/* Área de pagamentos */}
                  {selectedViagem === viagem.id_viagem && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <h4 className="font-medium mb-2">Pagamentos (Viagem ID: {viagem.id_viagem})</h4>
                      {!pagamentosPorViagem[viagem.id_viagem] ? (
                        <p className="text-sm text-gray-500">Carregando pagamentos...</p>
                      ) : pagamentosPorViagem[viagem.id_viagem].length === 0 ? (
                        <p className="text-sm text-gray-500">
                          Nenhum pagamento registrado para esta viagem
                        </p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  ID
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Viagem ID
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Valor
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Passagens
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Data
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {pagamentosPorViagem[viagem.id_viagem]
                                .filter((pagamento) => pagamento.id_viagem === viagem.id_viagem) // Filtro redundante para segurança
                                .map((pagamento) => (
                                  <tr key={pagamento.id_pagamento}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {pagamento.id_pagamento}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {pagamento.id_viagem}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                      {formatarMoeda(pagamento.valor_pago)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {pagamento.quant}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {formatarData(pagamento.data_pagamento)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Viagem;