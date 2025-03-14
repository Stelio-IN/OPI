import React, { useEffect, useState } from 'react';
import { styles } from './AdminDashboard';

// Definindo a interface para os dados que vêm da API
interface Institution {
  id_instituicao: number;
  nome: string;
  email: string;
  senha: string;
  localizacao: string;
  createdAt: string;
  updatedAt: string;
}

const Institutions: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  // Função para buscar as instituições da API
  const fetchInstitutions = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/instituicoes');
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.error('Erro ao carregar instituições:', error);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Instituições</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeader}>Nome</th>
                <th style={styles.tableHeader}>Localização</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution) => (
                <tr key={institution.id_instituicao} style={styles.tableRow}>
                  <td style={styles.tableCell}>{institution.nome}</td>
                  <td style={styles.tableCell}>{institution.localizacao}</td>
                  <td style={styles.tableCell}>{institution.email}</td>
                  <td style={styles.tableCell}>
                    <button 
                      style={{ ...styles.button, ...styles.buttonText }} 
                      className="text-blue-600"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Institutions;
