import React, { useState, useEffect } from 'react';
import { styles } from './AdminDashboard';

interface Tariff {
  id_tarifa: number;
  valor: number;
  tipo_cli: string;
}

const Tariffs: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<Tariff | null>(null);
  const [newTariff, setNewTariff] = useState({
    valor: '',
    tipo_cli: '',
  });

  // Carregar tarifas ao montar o componente
  useEffect(() => {
    fetchTariffs();
  }, []);

  // Função para buscar tarifas
  const fetchTariffs = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/tarifa/all');
      const data = await response.json();
      setTariffs(data);
    } catch (error) {
      console.error('Erro ao buscar tarifas:', error);
    }
  };

  // Função para abrir a modal de cadastro/edição
  const openModal = (tariff: Tariff | null = null) => {
    if (tariff) {
      setCurrentTariff(tariff);
      setNewTariff({
        valor: tariff.valor.toString(),
        tipo_cli: tariff.tipo_cli,
      });
      setIsEditing(true);
    } else {
      setNewTariff({ valor: '', tipo_cli: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmitTariff = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3005/api/tarifa?id_tarifa=${currentTariff?.id_tarifa}`
      : 'http://localhost:3005/api/tarifa';
    const method = isEditing ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor: parseFloat(newTariff.valor),
          tipo_cli: newTariff.tipo_cli,
        }),
      });
      if (response.ok) {
        setShowModal(false);
        fetchTariffs(); // Recarrega a lista de tarifas
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar tarifa:', errorData.error);
      }
    } catch (error) {
      console.error('Erro ao salvar tarifa:', error);
    }
  };

  // Função para deletar uma tarifa
  const handleDeleteTariff = async (id_tarifa: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarifa?')) {
      try {
        const response = await fetch(`http://localhost:3005/api/tarifa?id_tarifa=${id_tarifa}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchTariffs(); // Recarrega a lista de tarifas
        } else {
          const errorData = await response.json();
          console.error('Erro ao excluir tarifa:', errorData.error);
        }
      } catch (error) {
        console.error('Erro ao excluir tarifa:', error);
      }
    }
  };

  // Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTariff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Estilos para o modal e formulário
  const modalStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '24px',
      width: '500px',
      maxWidth: '90%',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#2563EB', // Azul
      borderBottom: '2px solid #E5E7EB',
      paddingBottom: '10px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #D1D5DB',
      fontSize: '1rem',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #D1D5DB',
      fontSize: '1rem',
      backgroundColor: 'white',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '24px',
    },
    buttonCancel: {
      padding: '10px 16px',
      backgroundColor: '#F3F4F6',
      color: '#1F2937',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
    },
    buttonSave: {
      padding: '10px 16px',
      backgroundColor: '#2563EB',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
    },
  };

  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Tarifas</h1>
        <button
          style={{ ...styles.button, ...styles.buttonPrimary }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal()}
        >
          + Nova Tarifa
        </button>
      </div>

      {/* Modal para cadastro/edição de tarifa */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={modalStyles.title}>
              {isEditing ? 'Editar Tarifa' : 'Cadastrar Nova Tarifa'}
            </h2>
            <form onSubmit={handleSubmitTariff}>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Valor (R$):</label>
                <input
                  type="number"
                  name="valor"
                  value={newTariff.valor}
                  onChange={handleInputChange}
                  required
                  style={modalStyles.input}
                  step="0.01"
                  min="0"
                />
              </div>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Tipo de Cliente:</label>
                <select
                  name="tipo_cli"
                  value={newTariff.tipo_cli}
                  onChange={handleInputChange}
                  required
                  style={modalStyles.select}
                >
                  <option value="">Selecione</option>
                  <option value="normal">Normal</option>
                  <option value="estudante">Estudante</option>
                  <option value="idoso">Idoso</option>
                  <option value="deficiente">Deficiente</option>
                </select>
              </div>
              <div style={modalStyles.buttonContainer}>
                <button
                  type="button"
                  style={modalStyles.buttonCancel}
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={modalStyles.buttonSave}
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de tarifas */}
      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Valor (R$)</th>
                <th style={styles.tableHeader}>Tipo de Cliente</th>
                <th style={styles.tableHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tariffs.map((tariff) => (
                <tr key={tariff.id_tarifa} style={styles.tableRow}>
                  <td style={styles.tableCell}>{tariff.id_tarifa}</td>
                  <td style={styles.tableCell}>{tariff.valor.toFixed(2)}</td>
                  <td style={styles.tableCell}>
                    {tariff.tipo_cli === 'normal' ? 'Normal' : 
                     tariff.tipo_cli === 'estudante' ? 'Estudante' : 
                     tariff.tipo_cli === 'idoso' ? 'Idoso' : 
                     tariff.tipo_cli === 'deficiente' ? 'Deficiente' : tariff.tipo_cli}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={{ ...styles.button, ...styles.buttonText }}
                      className="text-blue-600 mr-2"
                      onClick={() => openModal(tariff)}
                    >
                      Editar
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.buttonText, ...styles.buttonDanger }}
                      className="text-red-600"
                      onClick={() => handleDeleteTariff(tariff.id_tarifa)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {tariffs.length === 0 && (
                <tr>
                  <td colSpan={4} style={{...styles.tableCell, textAlign: 'center'}}>
                    Nenhuma tarifa cadastrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tariffs;