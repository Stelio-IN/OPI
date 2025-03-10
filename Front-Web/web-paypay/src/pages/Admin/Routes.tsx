import React from 'react';
import { styles, Route } from './AdminDashboard';

interface RoutesProps {
  routes: Route[];
}

const Routes: React.FC<RoutesProps> = ({ routes }) => {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Rotas</h1>
        <button style={{...styles.button, ...styles.buttonPrimary}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nova Rota
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
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
                <tr key={route.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{route.id}</td>
                  <td style={styles.tableCell}>{route.origin}</td>
                  <td style={styles.tableCell}>{route.destination}</td>
                  <td style={styles.tableCell}>{route.distance}</td>
                  <td style={styles.tableCell}>
                    <span style={{...styles.statusBadge, ...styles.statusActive}}>{route.status}</span>
                  </td>
                  <td style={styles.tableCell}>
                    <button style={{...styles.button, ...styles.buttonText}} className="text-blue-600 mr-2">Editar</button>
                    <button style={{...styles.button, ...styles.buttonText}} className="text-blue-600">Desativar</button>
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

export default Routes;