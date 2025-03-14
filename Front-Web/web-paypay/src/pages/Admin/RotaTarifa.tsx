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

  // Buscar rotas
  useEffect(() => {
    fetch('http://localhost:3005/api/rota/all')
      .then((res) => res.json())
      .then((data) => setRotas(data))
      .catch((error) => console.error('Erro ao carregar rotas:', error));
  }, []);

  // Buscar tarifas
  useEffect(() => {
    fetch('http://localhost:3005/api/tarifa/all')
      .then((res) => res.json())
      .then((data) => setTarifas(data))
      .catch((error) => console.error('Erro ao carregar tarifas:', error));
  }, []);

  // Buscar associações
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

  // Função para associar tarifa à rota
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
      
      // Resetar seleções após associação bem-sucedida
      setSelectedRota(null);
      setSelectedTarifa(null);
      
      // Recarregar associações para garantir dados atualizados
      carregarAssociacoes();
      
    } catch (error) {
      console.error(error);
      alert('Erro ao associar tarifa e rota.');
    } finally {
      setLoading(false);
    }
  };

  // Função para remover associação
  const removerAssociacao = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta associação?')) {
      return;
    }

    setRemovingId(id);
    try {
      const response = await fetch('http://localhost:3005/api/tarifa_rota/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Erro ao remover associação');
      }

      alert('Associação removida com sucesso!');
      // Atualizar lista de associações após remover
      carregarAssociacoes();
      
    } catch (error) {
      console.error(error);
      alert('Erro ao remover associação.');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Associação de Rotas e Tarifas</h1>

      <div style={styles.formContainer}>
        <h2 style={styles.subtitle}>Nova Associação</h2>
        
        <div style={styles.formGrid}>
          {/* Seleção de Rota */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Rota:</label>
            <select
              style={styles.select}
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

          {/* Seleção de Tarifa */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Tarifa:</label>
            <select
              style={styles.select}
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

        <div style={styles.buttonContainer}>
          <button
            onClick={associarTarifaRota}
            disabled={loading || !selectedRota || !selectedTarifa}
            style={{
              ...styles.button,
              ...(loading || !selectedRota || !selectedTarifa ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Associando...' : 'Associar'}
          </button>
        </div>
      </div>

      {/* Listagem das associações existentes */}
      <div style={styles.tableContainer}>
        <h2 style={styles.subtitle}>Associações Existentes</h2>
        
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Origem</th>
                <th style={styles.tableHeader}>Destino</th>
                <th style={styles.tableHeader}>Tipo Cliente</th>
                <th style={{...styles.tableHeader, textAlign: 'right'}}>Valor (MZN)</th>
                <th style={{...styles.tableHeader, textAlign: 'center'}}>Status</th>
                <th style={{...styles.tableHeader, textAlign: 'center'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associacoes.length > 0 ? (
                associacoes.map((assoc) => (
                  <tr key={assoc.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{assoc.Rota?.origen || 'Desconhecido'}</td>
                    <td style={styles.tableCell}>{assoc.Rota?.destino || 'Desconhecido'}</td>
                    <td style={styles.tableCell}>{assoc.Tarifa?.tipo_cli || 'Desconhecido'}</td>
                    <td style={{...styles.tableCell, textAlign: 'right', fontWeight: 500}}>
                      {assoc.Tarifa?.valor !== undefined ? `${assoc.Tarifa.valor.toFixed(2)} MZN` : 'N/A'}
                    </td>
                    <td style={{...styles.tableCell, textAlign: 'center'}}>
                      <span style={{
                        ...styles.badge,
                        ...(assoc.activo ? styles.badgeActive : styles.badgeInactive)
                      }}>
                        {assoc.activo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td style={{...styles.tableCell, textAlign: 'center'}}>
                      <button
                        onClick={() => removerAssociacao(assoc.id)}
                        disabled={removingId === assoc.id}
                        style={{
                          ...styles.removeButton,
                          ...(removingId === assoc.id ? styles.buttonDisabled : {})
                        }}
                      >
                        {removingId === assoc.id ? 'Removendo...' : 'Remover'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={styles.emptyMessage}>Nenhuma associação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS internos
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#2c5282',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px'
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#2c5282'
  },
  formContainer: {
    backgroundColor: '#ebf8ff',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  formGroup: {
    marginBottom: '12px'
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '4px',
    color: '#4a5568'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    fontSize: '14px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '120px',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed'
  },
  removeButton: {
    backgroundColor: '#e53e3e',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.2s'
  },
  tableContainer: {
    marginTop: '24px'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    borderRadius: '4px'
  },
  tableHeader: {
    borderBottom: '1px solid #e2e8f0',
    padding: '12px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    backgroundColor: '#f7fafc'
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    ':hover': {
      backgroundColor: '#f7fafc'
    }
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500'
  },
  badgeActive: {
    backgroundColor: '#c6f6d5',
    color: '#22543d'
  },
  badgeInactive: {
    backgroundColor: '#fed7d7',
    color: '#822727'
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '16px',
    color: '#718096'
  }
};

export default RotaTarifa;