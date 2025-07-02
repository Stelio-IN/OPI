import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardHome() {
  const [viagens, setViagens] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoRotas, setVeiculoRotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroPeriodo, setFiltroPeriodo] = useState('hoje'); // Filtro: hoje, 7 dias, 30 dias

  // Carregar dados iniciais
  useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    setLoading(true);
    try {
      const [viagensRes, pagamentosRes, veiculosRes, veiculoRotasRes] = await Promise.all([
        axios.get('http://localhost:3005/api/viagem'),
        axios.get('http://localhost:3005/api/pagamento'),
        axios.get('http://localhost:3005/api/veiculo'),
        axios.get('http://localhost:3005/api/veiculoRota'),
      ]);

      setViagens(viagensRes.data);
      setPagamentos(pagamentosRes.data);
      setVeiculos(veiculosRes.data);
      setVeiculoRotas(veiculoRotasRes.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar dados por período
  const filtrarDadosPorPeriodo = () => {
    const hoje = new Date();
    const inicioPeriodo = new Date();

    if (filtroPeriodo === '7dias') {
      inicioPeriodo.setDate(hoje.getDate() - 7);
    } else if (filtroPeriodo === '30dias') {
      inicioPeriodo.setDate(hoje.getDate() - 30);
    } else {
      inicioPeriodo.setHours(0, 0, 0, 0);
    }

    const viagensFiltradas = viagens.filter((v) => {
      const dataViagem = new Date(v.data_inicio);
      return dataViagem >= inicioPeriodo && dataViagem <= hoje;
    });

    const pagamentosFiltrados = pagamentos.filter((p) => {
      const dataPagamento = new Date(p.data_pagamento);
      return dataPagamento >= inicioPeriodo && dataPagamento <= hoje;
    });

    return { viagensFiltradas, pagamentosFiltrados };
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const { viagensFiltradas, pagamentosFiltrados } = filtrarDadosPorPeriodo();

    const veiculosAtivos = veiculos.filter((v) => v.estado_operacional === 'Operacional').length;
    const transacoes = pagamentosFiltrados.length;
    const receita = pagamentosFiltrados.reduce((sum, p) => sum + p.valor_pago, 0);
    const totalPassagens = pagamentosFiltrados.reduce((sum, p) => sum + p.quant, 0);
    const taxaSucesso = viagensFiltradas.length
      ? ((viagensFiltradas.filter((v) => v.status === 'Concluída').length / viagensFiltradas.length) * 100).toFixed(1)
      : 0;

    return { veiculosAtivos, transacoes, receita, totalPassagens, taxaSucesso };
  };

  // Dados para o gráfico de barras (viagens por status)
  const dadosGraficoViagens = () => {
    const { viagensFiltradas } = filtrarDadosPorPeriodo();
    const statusCounts = { Planejada: 0, 'Em andamento': 0, Concluída: 0 };

    viagensFiltradas.forEach((v) => {
      statusCounts[v.status]++;
    });

    const maxCount = Math.max(...Object.values(statusCounts), 1); // Evitar divisão por 0
    return { statusCounts, maxCount };
  };

  // Dados para o gráfico de pizza (viagens por veículo)
  const dadosGraficoVeiculos = () => {
    const { viagensFiltradas } = filtrarDadosPorPeriodo();
    const veiculoCounts = {};

    viagensFiltradas.forEach((v) => {
      const veiculoRota = veiculoRotas.find((vr) => vr.id_veiculo_tarifa_rota === v.id_veiculo_tarifa_rota);
      if (veiculoRota) {
        const veiculo = veiculoRota.Veiculo;
        const key = `${veiculo.marca} ${veiculo.modelo} (${veiculo.matricula})`;
        veiculoCounts[key] = (veiculoCounts[key] || 0) + 1;
      }
    });

    return Object.entries(veiculoCounts).map(([label, value], index) => ({
      label,
      value,
      color: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'][index % 5],
    }));
  };

  // Dados para a tabela de receita diária
  const dadosTabelaReceita = () => {
    const { pagamentosFiltrados } = filtrarDadosPorPeriodo();
    const dias = filtroPeriodo === 'hoje' ? 1 : filtroPeriodo === '7dias' ? 7 : 30;
    const resultado = [];

    for (let i = dias - 1; i >= 0; i--) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      const receitaDia = pagamentosFiltrados
        .filter((p) => {
          const dataPagamento = new Date(p.data_pagamento);
          return (
            dataPagamento.getDate() === data.getDate() &&
            dataPagamento.getMonth() === data.getMonth() &&
            dataPagamento.getFullYear() === data.getFullYear()
          );
        })
        .reduce((sum, p) => sum + p.valor_pago, 0);

      resultado.push({
        data: data.toLocaleDateString('pt-MZ'),
        receita: receitaDia,
      });
    }

    return resultado;
  };

  // Formatar moeda
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' });
  };

  // Formatar data
  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleString('pt-MZ');
  };

  const { veiculosAtivos, transacoes, receita, totalPassagens, taxaSucesso } = calcularEstatisticas();
  const { statusCounts, maxCount } = dadosGraficoViagens();
  const dadosVeiculos = dadosGraficoVeiculos();
  const dadosReceita = dadosTabelaReceita();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {error && <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>}

      {/* Filtro de Período */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por período:</label>
        <select
          value={filtroPeriodo}
          onChange={(e) => setFiltroPeriodo(e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="hoje">Hoje</option>
          <option value="7dias">Últimos 7 dias</option>
          <option value="30dias">Últimos 30 dias</option>
        </select>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105">
          <div className="text-2xl font-bold text-gray-800 mb-2">{veiculosAtivos}</div>
          <div className="text-sm text-gray-500">Veículos Ativos</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105">
          <div className="text-2xl font-bold text-gray-800 mb-2">{transacoes}</div>
          <div className="text-sm text-gray-500">Transações ({filtroPeriodo})</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105">
          <div className="text-2xl font-bold text-gray-800 mb-2">{formatarMoeda(receita)}</div>
          <div className="text-sm text-gray-500">Receita ({filtroPeriodo})</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105">
          <div className="text-2xl font-bold text-gray-800 mb-2">{taxaSucesso}%</div>
          <div className="text-sm text-gray-500">Taxa de Sucesso</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col transition-transform hover:scale-105">
          <div className="text-2xl font-bold text-gray-800 mb-2">{totalPassagens}</div>
          <div className="text-sm text-gray-500">Passagens Vendidas</div>
        </div>
      </div>

      {/* Gráficos e Tabela */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Barras: Viagens por Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Viagens por Status</h3>
          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : (
            <div className="flex items-end h-64">
              <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                {/* Eixos */}
                <line x1="20" y1="180" x2="280" y2="180" stroke="#d1d5db" strokeWidth="2" />
                <line x1="20" y1="20" x2="20" y2="180" stroke="#d1d5db" strokeWidth="2" />
                {/* Barras */}
                {['Planejada', 'Em andamento', 'Concluída'].map((status, index) => {
                  const height = (statusCounts[status] / maxCount) * 150;
                  return (
                    <g key={status}>
                      <rect
                        x={50 + index * 80}
                        y={180 - height}
                        width="60"
                        height={height}
                        fill={['#3B82F6', '#10B981', '#EF4444'][index]}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                      <text x={50 + index * 80 + 30} y="195" textAnchor="middle" className="text-xs text-gray-600">
                        {status}
                      </text>
                      <text x={50 + index * 80 + 30} y={170 - height} textAnchor="middle" className="text-xs text-gray-800">
                        {statusCounts[status]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Tabela de Receita Diária */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Receita Di妻ria</h3>
          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Receita (MZN)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dadosReceita.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-500">{item.data}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{formatarMoeda(item.receita)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Gráfico de Pizza: Viagens por Veículo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Distribuição de Viagens por Veículo</h3>
          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : (
            <div className="flex justify-center">
              <svg className="w-64 h-64" viewBox="-100 -100 200 200">
                {dadosVeiculos.length > 0 ? (
                  dadosVeiculos.map((item, index, arr) => {
                    const total = arr.reduce((sum, i) => sum + i.value, 0);
                    const percent = (item.value / total) * 360;
                    const startAngle = arr.slice(0, index).reduce((sum, i) => sum + (i.value / total) * 360, 0);
                    const largeArc = percent > 180 ? 1 : 0;
                    const startX = 80 * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 80 * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 80 * Math.cos(((startAngle + percent) * Math.PI) / 180);
                    const endY = 80 * Math.sin(((startAngle + percent) * Math.PI) / 180);

                    return (
                      <path
                        key={item.label}
                        d={`M 0 0 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`}
                        fill={item.color}
                        className="transition-all duration-300 hover:opacity-80"
                        onMouseOver={(e) => e.currentTarget.nextSibling?.setAttribute('opacity', '1')}
                        onMouseOut={(e) => e.currentTarget.nextSibling?.setAttribute('opacity', '0')}
                      />
                    );
                  })
                ) : (
                  <text x="0" y="0" textAnchor="middle" className="text-sm text-gray-500">
                    Sem dados
                  </text>
                )}
                {dadosVeiculos.map((item, index, arr) => {
                  const total = arr.reduce((sum, i) => sum + i.value, 0);
                  const percent = (item.value / total) * 360;
                  const midAngle = arr.slice(0, index).reduce((sum, i) => sum + (i.value / total) * 360, 0) + percent / 2;
                  const labelX = 90 * Math.cos((midAngle * Math.PI) / 180);
                  const labelY = 90 * Math.sin((midAngle * Math.PI) / 180);

                  return (
                    <text
                      key={item.label}
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      className="text-xs text-gray-800"
                      opacity="0"
                    >
                      {item.label.split(' ')[0]} ({item.value})
                    </text>
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Atividade Recente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h3>
        {loading ? (
          <p className="text-gray-500">Carregando...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pagamentos
              .slice(0, 3)
              .map((pagamento) => {
                const viagem = viagens.find((v) => v.id_viagem === pagamento.id_viagem);
                const veiculoRota = viagem
                  ? veiculoRotas.find((vr) => vr.id_veiculo_tarifa_rota === viagem.id_veiculo_tarifa_rota)
                  : null;
                return (
                  <li key={pagamento.id_pagamento} className="flex items-center py-3 hover:bg-gray-50">
                    <div className="w-9 h-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 mb-1">
                        Pagamento de {pagamento.quant} passagem{pagamento.quant > 1 ? 's' : ''} -{' '}
                        {veiculoRota
                          ? `${veiculoRota.Rotum.origen} → ${veiculoRota.Rotum.destino}`
                          : 'Rota desconhecida'}
                      </div>
                      <div className="text-xs text-gray-400">
                        Valor: {formatarMoeda(pagamento.valor_pago)} | {formatarData(pagamento.data_pagamento)}
                      </div>
                    </div>
                  </li>
                );
              })}
            {pagamentos.length === 0 && (
              <li className="py-3 text-sm text-gray-500">Nenhuma atividade recente</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;