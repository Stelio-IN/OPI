import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Veiculo {
  id_veiculo: number;
  matricula: string;
  modelo: string;
  marca: string;
  capacidade: number;
}

interface Rota {
  id_rota: number;
  origen: string;
  destino: string;
  distancia: number;
  status: boolean;
}

interface Viagem {
  id_viagem: number;
  id_veiculo_tarifa_rota: number;
  data_inicio: string;
  data_fim: string | null;
  status: string;
  Veiculo?: Veiculo;
  Rota?: Rota;
  tarifa?: number;
}

const Pagamento: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [viagemSelecionada, setViagemSelecionada] = useState<Viagem | null>(null);
  const [pagamentoEfetuado, setPagamentoEfetuado] = useState<boolean>(false);

  // Carrega viagens em andamento
  useEffect(() => {
    const carregarViagens = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3005/api/viagem');
        
        // Filtra apenas viagens em andamento
        const viagensAndamento = response.data.filter((v: Viagem) => v.status === 'Em andamento');
        
        // Carrega detalhes adicionais para cada viagem
        const viagensComDetalhes = await Promise.all(
          viagensAndamento.map(async (viagem: Viagem) => {
            const veiculoRotaResponse = await axios.get(
              `http://localhost:3005/api/veiculoRota?id_veiculo_tarifa_rota=${viagem.id_veiculo_tarifa_rota}`
            );
            return {
              ...viagem,
              Veiculo: veiculoRotaResponse.data[0]?.Veiculo,
              Rota: veiculoRotaResponse.data[0]?.Rotum,
              tarifa: veiculoRotaResponse.data[0]?.tarifa
            };
          })
        );
        
        setViagens(viagensComDetalhes);
      } catch (err) {
        setError('Erro ao carregar viagens');
      } finally {
        setLoading(false);
      }
    };

    carregarViagens();
  }, []);

  const efetuarPagamento = async () => {
    try {
      if (!viagemSelecionada) {
        throw new Error('Nenhuma viagem selecionada');
      }

      setLoading(true);
      setError(null);

      const valorTotal = (viagemSelecionada.tarifa || 0) * quantidade;

      const pagamentoData = {
        id_viagem: viagemSelecionada.id_viagem,
        valor_pago: valorTotal,
        data_pagamento: new Date().toISOString(),
        quant: quantidade
      };

      await axios.post('http://localhost:3005/api/pagamento', pagamentoData);
      setPagamentoEfetuado(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao efetuar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleString();
  };

  const reiniciarProcesso = () => {
    setViagemSelecionada(null);
    setPagamentoEfetuado(false);
    setQuantidade(1);
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Pagamento de Passagem</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <p>Carregando...</p>
        </div>
      )}

      {!viagemSelecionada && !pagamentoEfetuado && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Viagens em Andamento</h3>
          
          {viagens.length === 0 ? (
            <p className="text-gray-500">Nenhuma viagem em andamento no momento</p>
          ) : (
            <div className="space-y-3">
              {viagens.map((viagem) => (
                <div 
                  key={viagem.id_viagem} 
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setViagemSelecionada(viagem)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium">Veículo</p>
                      <p>{viagem.Veiculo?.marca} {viagem.Veiculo?.modelo}</p>
                      <p className="text-sm text-gray-500">{viagem.Veiculo?.matricula}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Rota</p>
                      <p>{viagem.Rota?.origen} → {viagem.Rota?.destino}</p>
                      <p className="text-sm text-gray-500">{viagem.Rota?.distancia} km</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Tarifa</p>
                      <p>{viagem.tarifa} MZN</p>
                      <p className="text-sm text-gray-500">Iniciada em: {formatarData(viagem.data_inicio)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {viagemSelecionada && !pagamentoEfetuado && (
        <div className="border rounded-lg p-4 mb-4">
          <button
            onClick={reiniciarProcesso}
            className="mb-3 text-blue-500 hover:text-blue-700"
          >
            &larr; Voltar para lista de viagens
          </button>
          
          <h3 className="font-medium mb-3">Detalhes da Viagem Selecionada</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Veículo:</p>
              <p className="font-medium">{viagemSelecionada.Veiculo?.marca} {viagemSelecionada.Veiculo?.modelo}</p>
              <p className="text-sm">{viagemSelecionada.Veiculo?.matricula}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Rota:</p>
              <p className="font-medium">{viagemSelecionada.Rota?.origen} → {viagemSelecionada.Rota?.destino}</p>
              <p className="text-sm">Distância: {viagemSelecionada.Rota?.distancia} km</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Tarifa unitária:</p>
              <p className="font-medium">{viagemSelecionada.tarifa} MZN</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Quantidade:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Total a pagar:</p>
            <p className="font-bold text-xl">{(viagemSelecionada.tarifa || 0) * quantidade} MZN</p>
          </div>
          
          <button
            onClick={efetuarPagamento}
            disabled={loading}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? 'Processando Pagamento...' : 'Confirmar Pagamento'}
          </button>
        </div>
      )}

      {pagamentoEfetuado && (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4 text-center">
          <h3 className="font-medium text-green-700 mb-2">Pagamento Efetuado com Sucesso!</h3>
          <p className="mb-3">Obrigado por utilizar nosso serviço.</p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <p className="text-sm text-gray-500">Valor:</p>
              <p>{(viagemSelecionada?.tarifa || 0) * quantidade} MZN</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Passagens:</p>
              <p>{quantidade}</p>
            </div>
          </div>
          
          <button
            onClick={reiniciarProcesso}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Efetuar Novo Pagamento
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagamento;