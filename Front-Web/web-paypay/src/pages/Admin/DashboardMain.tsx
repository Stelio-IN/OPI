import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';
import { TrendingUp, Truck, MapPin, CreditCard, Users, Activity } from 'lucide-react';

const DashboardMain: React.FC = () => {
  const [instituicoes, setInstituicoes] = useState<any[]>([]);
  const [rotas, setRotas] = useState<any[]>([]);
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cores para os gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscando dados das instituições
        const instituicoesRes = await fetch('http://localhost:3005/api/instituicoes');
        const instituicoesData = await instituicoesRes.json();
        
        // Buscando dados das rotas
        const rotasRes = await fetch('http://localhost:3005/api/rota/all');
        const rotasData = await rotasRes.json();
        
        // Buscando dados das tarifas
        const tarifasRes = await fetch('http://localhost:3005/api/tarifa_rota/all');
        const tarifasData = await tarifasRes.json();
        
        setInstituicoes(instituicoesData);
        setRotas(rotasData);
        setTarifas(tarifasData);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, verifique se a API está funcionando.');
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preparando dados para gráficos
  const prepareChartData = () => {
    // Agrupa instituições por tipo (exemplo)
    const instituicoesPorTipo = instituicoes.reduce((acc, inst) => {
      const tipo = inst.tipo || 'Não categorizado';
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {});

    // Dados para gráfico de pizza
    const pieData = Object.entries(instituicoesPorTipo).map(([name, value]) => ({
      name, 
      value
    }));

    // Dados para gráfico de barras (rotas por instituição)
    const rotasPorInstituicao = rotas.reduce((acc, rota) => {
      const instituicaoId = rota.instituicao_id;
      acc[instituicaoId] = (acc[instituicaoId] || 0) + 1;
      return acc;
    }, {});

    const barData = Object.entries(rotasPorInstituicao)
      .map(([instituicaoId, count]) => {
        const instituicao = instituicoes.find(i => i.id === instituicaoId) || { nome: `ID: ${instituicaoId}` };
        return {
          name: instituicao.nome?.substring(0, 15) || `ID: ${instituicaoId}`,
          rotas: count
        };
      })
      .slice(0, 5); // Limita para 5 instituições para melhor visualização

    // Dados para gráfico de linha (tarifas médias por mês - simulado)
    const lineData = [
      { name: 'Jan', valor: Math.random() * 50 + 50 },
      { name: 'Fev', valor: Math.random() * 50 + 50 },
      { name: 'Mar', valor: Math.random() * 50 + 50 },
      { name: 'Abr', valor: Math.random() * 50 + 50 },
      { name: 'Mai', valor: Math.random() * 50 + 50 },
      { name: 'Jun', valor: Math.random() * 50 + 50 },
    ];

    return { pieData, barData, lineData };
  };

  const { pieData, barData, lineData } = loading ? { 
    pieData: [], 
    barData: [], 
    lineData: [] 
  } : prepareChartData();

  // Estatísticas gerais
  const statsCards = [
    {
      title: 'Total de Instituições',
      value: instituicoes.length,
      icon: <Users size={24} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total de Rotas',
      value: rotas.length,
      icon: <MapPin size={24} />,
      color: 'bg-green-500'
    },
    {
      title: 'Total de Tarifas',
      value: tarifas.length,
      icon: <CreditCard size={24} />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Média Tarifa',
      value: tarifas.length > 0 
        ? `R$ ${(tarifas.reduce((sum, t) => sum + (t.valor || 0), 0) / tarifas.length).toFixed(2)}`
        : 'N/A',
      icon: <TrendingUp size={24} />,
      color: 'bg-purple-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg text-red-700 m-4">
        <h2 className="font-bold text-lg mb-2">Erro!</h2>
        <p>{error}</p>
        <button 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Administrativo</h1>
        <p className="text-gray-600">Sistema de Gerenciamento de Empresas de Transporte</p>
      </header>

      {/* Cards de estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`${card.color} p-3 rounded-full mr-4`}>
              <div className="text-white">{card.icon}</div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Barras - Rotas por Instituição */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 Instituições por Número de Rotas</h2>
          <div className="h-64">
            <BarChart width={500} height={250} data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rotas" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        {/* Gráfico de Pizza - Instituições por Tipo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Distribuição de Instituições por Tipo</h2>
          <div className="h-64 flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Gráfico de Linha - Tendência de Tarifas */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Evolução das Tarifas Médias (R$)</h2>
        <div className="h-64">
          <LineChart width={1000} height={250} data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor Médio']} />
            <Legend />
            <Line type="monotone" dataKey="valor" stroke="#ff7300" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>

      {/* Tabelas de dados recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instituições recentes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Instituições Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {instituicoes.slice(0, 5).map((inst, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{inst.nome || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{inst.tipo || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inst.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {inst.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rotas recentes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Rotas Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origem
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destino
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distância
                  </th>
                </tr>
              </thead>
              <tbody>
                {rotas.slice(0, 5).map((rota, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{rota.origem || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{rota.destino || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{rota.distancia ? `${rota.distancia} km` : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;