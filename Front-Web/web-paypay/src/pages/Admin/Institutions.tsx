import React from 'react';
import { styles, Institution } from './AdminDashboard';

interface InstitutionsProps {
  institutions: Institution[];
}

const Institutions: React.FC<InstitutionsProps> = ({ institutions }) => {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Instituições</h1>
        <button style={{...styles.button, ...styles.buttonPrimary}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nova Instituição
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeader}>Nome</th>
                <th style={styles.tableHeader}>Endereço</th>
                <th style={styles.tableHeader}>Contato</th>
                <th style={styles.tableHeader}>Alunos</th>
                <th style={styles.tableHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution) => (
                <tr key={institution.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{institution.name}</td>
                  <td style={styles.tableCell}>{institution.address}</td>
                  <td style={styles.tableCell}>{institution.contact}</td>
                  <td style={styles.tableCell}>{institution.students.toLocaleString()}</td>
                  <td style={styles.tableCell}>
                    <button style={{...styles.button, ...styles.buttonText}} className="text-blue-600 mr-2">Editar</button>
                    <button style={{...styles.button, ...styles.buttonText, ...styles.buttonDanger}} className="text-red-600">Excluir</button>
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