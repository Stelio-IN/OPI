import React, { useState, useEffect } from 'react';
import { styles } from './AdminDashboard';

interface Route {
  id_rota: number;
  origen: string;
  destino: string;
  distancia: number;
  status: boolean;
}

const Routes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [newRoute, setNewRoute] = useState({
    origen: '',
    destino: '',
    distancia: '',
    status: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar rotas ao montar o componente
  useEffect(() => {
    fetchRoutes();
  }, []);

  // Função para buscar rotas
  const fetchRoutes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/api/rota/all');
      if (!response.ok) {
        throw new Error(`Erro ao buscar rotas: ${response.status}`);
      }
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error('Erro ao buscar rotas:', error);
      setError('Falha ao carregar as rotas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para abrir a modal de cadastro/edição
  const openModal = (route: Route | null = null) => {
    setError(null);
    if (route) {
      setCurrentRoute(route);
      setNewRoute({
        origen: route.origen,
        destino: route.destino,
        distancia: route.distancia.toString(),
        status: route.status,
      });
      setIsEditing(true);
    } else {
      setCurrentRoute(null);
      setNewRoute({ origen: '', destino: '', distancia: '', status: true });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  // Função para cadastrar ou atualizar uma rota
  const handleSubmitRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const url = isEditing
      ? `http://localhost:3005/api/rota?id_rota=${currentRoute?.id_rota}`
      : 'http://localhost:3005/api/rota';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      // Validar os dados antes de enviar
      if (!newRoute.origen || !newRoute.destino || !newRoute.distancia) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origen: newRoute.origen,
          destino: newRoute.destino,
          distancia: parseFloat(newRoute.distancia),
          status: newRoute.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} rota`);
      }

      // Sucesso
      setShowModal(false);
      await fetchRoutes(); // Recarrega a lista de rotas
      
      // Exibir um alerta de sucesso temporário
      alert(`Rota ${isEditing ? 'atualizada' : 'cadastrada'} com sucesso!`);
      
    } catch (error: any) {
      console.error('Erro ao salvar rota:', error);
      setError(error.message || `Falha ao ${isEditing ? 'atualizar' : 'cadastrar'} a rota`);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar uma rota
  const handleDeleteRoute = async (id_rota: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta rota?')) {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:3005/api/rota?id_rota=${id_rota}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao excluir rota');
        }
        
        // Sucesso - atualizar localmente para evitar nova chamada à API
        setRoutes(routes.filter(route => route.id_rota !== id_rota));
        alert('Rota excluída com sucesso!');
        
      } catch (error: any) {
        console.error('Erro ao excluir rota:', error);
        setError(error.message || 'Falha ao excluir a rota');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRoute((prev) => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  // Estilos customizados para a modal
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    } as React.CSSProperties,
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
      width: '500px',
      maxWidth: '90%',
      padding: '24px',
      position: 'relative',
    } as React.CSSProperties,
    modalHeader: {
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '16px',
      paddingBottom: '12px',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#2d3748',
      margin: 0,
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#4a5568',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      fontSize: '1rem',
      backgroundColor: 'white',
      transition: 'border-color 0.2s',
      outline: 'none',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '20px',
    },
    cancelButton: {
      padding: '10px 16px',
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    saveButton: {
      padding: '10px 16px',
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    errorMessage: {
      color: '#e53e3e',
      marginBottom: '16px',
      padding: '8px 12px',
      backgroundColor: '#fff5f5',
      borderRadius: '4px',
      fontSize: '0.875rem',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      borderRadius: '8px',
    } as React.CSSProperties,
  };

  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Rotas</h1>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal()}
          disabled={isLoading}
        >
          + Nova Rota
        </button>
      </div>

      {/* Mensagem de erro global */}
      {error && !showModal && (
        <div style={modalStyles.errorMessage}>
          {error}
        </div>
      )}

      {/* Modal para cadastro/edição de rota - Agora centralizada e estilizada */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            {isLoading && (
              <div style={modalStyles.loadingOverlay}>
                <div>Carregando...</div>
              </div>
            )}
            
            <div style={modalStyles.modalHeader}>
              <h2 style={modalStyles.modalTitle}>
                {isEditing ? 'Editar Rota' : 'Cadastrar Nova Rota'}
              </h2>
            </div>
            
            {error && (
              <div style={modalStyles.errorMessage}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmitRoute}>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Origem:</label>
                <input
                  style={modalStyles.input}
                  type="text"
                  name="origen"
                  value={newRoute.origen}
                  onChange={handleInputChange}
                  placeholder="Digite a cidade de origem"
                  required
                  disabled={isLoading}
                />
              </div>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Destino:</label>
                <input
                  style={modalStyles.input}
                  type="text"
                  name="destino"
                  value={newRoute.destino}
                  onChange={handleInputChange}
                  placeholder="Digite a cidade de destino"
                  required
                  disabled={isLoading}
                />
              </div>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Distância (km):</label>
                <input
                  style={modalStyles.input}
                  type="number"
                  name="distancia"
                  value={newRoute.distancia}
                  onChange={handleInputChange}
                  placeholder="Digite a distância em km"
                  min="0"
                  step="0.1"
                  required
                  disabled={isLoading}
                />
              </div>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Status:</label>
                <select
                  style={modalStyles.select}
                  name="status"
                  value={newRoute.status.toString()}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                >
                  <option value="true">Ativa</option>
                  <option value="false">Inativa</option>
                </select>
              </div>
              <div style={modalStyles.buttonContainer}>
                <button
                  type="button"
                  style={modalStyles.cancelButton}
                  onClick={() => setShowModal(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={modalStyles.saveButton}
                  disabled={isLoading}
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de rotas */}
      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        {isLoading && !showModal && <div>Carregando rotas...</div>}
        
        {routes.length === 0 && !isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Nenhuma rota encontrada. Clique em "+ Nova Rota" para adicionar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeader}>Código</th>
                  <th style={styles.tableHeader}>Origem</th>
                  <th style={styles.tableHeader}>Destino</th>
                  <th style={styles.tableHeader}>Distância</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id_rota} style={styles.tableRow}>
                    <td style={styles.tableCell}>{route.id_rota}</td>
                    <td style={styles.tableCell}>{route.origen}</td>
                    <td style={styles.tableCell}>{route.destino}</td>
                    <td style={styles.tableCell}>{route.distancia} km</td>
                    <td style={styles.tableCell}>
                      <span style={{...styles.statusBadge, ...(route.status ? styles.statusActive : styles.statusInactive)}}>
                        {route.status ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={{ ...styles.button, ...styles.buttonText }}
                        className="text-blue-600 mr-2"
                        onClick={() => openModal(route)}
                        disabled={isLoading}
                      >
                        Editar
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.buttonText, ...styles.buttonDanger }}
                        className="text-red-600"
                        onClick={() => handleDeleteRoute(route.id_rota)}
                        disabled={isLoading}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes;