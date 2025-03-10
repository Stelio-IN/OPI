import React from 'react';
import { styles, Activity } from './AdminDashboard';

interface DashboardMainProps {
  activities: Activity[];
}

const DashboardMain: React.FC<DashboardMainProps> = ({ activities }) => {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Dashboard</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Bem-vindo, Administrador!</h2>
        <p className="text-gray-600">Aqui está um resumo do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center" style={styles.statCard}>
          <p style={styles.statLabel}>Instituições</p>
          <h3 style={styles.statValue}>28</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center" style={styles.statCard}>
          <p style={styles.statLabel}>Rotas Ativas</p>
          <h3 style={styles.statValue}>156</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center" style={styles.statCard}>
          <p style={styles.statLabel}>Tarifas Configuradas</p>
          <h3 style={styles.statValue}>42</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center" style={styles.statCard}>
          <p style={styles.statLabel}>Usuários</p>
          <h3 style={styles.statValue}>389</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6" style={styles.tableContainer}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h2>
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeader}>Ação</th>
                <th style={styles.tableHeader}>Descrição</th>
                <th style={styles.tableHeader}>Data</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{activity.action}</td>
                  <td style={styles.tableCell}>{activity.description}</td>
                  <td style={styles.tableCell}>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;