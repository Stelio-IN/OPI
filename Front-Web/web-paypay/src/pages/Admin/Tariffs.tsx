import React from 'react';
import { styles, Tariff } from './AdminDashboard';

interface TariffsProps {
  tariffs: Tariff[];
}

const Tariffs: React.FC<TariffsProps> = ({ tariffs }) => {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Tarifas</h1>
        <button style={{...styles.button, ...styles.buttonPrimary}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nova Tarifa
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeader}>Rota</th>
                <th style={styles.tableHeader}>Tipo</th>
                <th style={styles.tableHeader}>Valor (R$)</th>
                <th style={styles.tableHeader}>Vigência</th>
                <th style={styles.tableHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tariffs.map((tariff, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{tariff.routeId}</td>
                  <td style={styles.tableCell}>{tariff.type}</td>
                  <td style={styles.tableCell}>{tariff.value}</td>
                  <td style={styles.tableCell}>{tariff.validity}</td>
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

export default Tariffs;