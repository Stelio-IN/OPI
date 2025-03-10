import React from 'react';

function DashboardHome() {
  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '24px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#2d3748',
    },
    statLabel: {
      color: '#718096',
      fontSize: '14px',
    },
    recentActivity: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginTop: '24px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#2d3748',
    },
    activityList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    activityItem: {
      padding: '12px 0',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
    },
    activityIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#ebf8ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      color: '#3182ce',
    },
    activityContent: {
      flex: 1,
    },
    activityTitle: {
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#2d3748',
    },
    activityTime: {
      fontSize: '12px',
      color: '#a0aec0',
    }
  };

  return (
    <div>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>156</div>
          <div style={styles.statLabel}>Veículos ativos</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>3.452</div>
          <div style={styles.statLabel}>Transações hoje</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>R$ 14.389</div>
          <div style={styles.statLabel}>Receita diária</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>98.2%</div>
          <div style={styles.statLabel}>Taxa de sucesso</div>
        </div>
      </div>

      <div style={styles.recentActivity}>
        <h3 style={styles.sectionTitle}>Atividade Recente</h3>
        <ul style={styles.activityList}>
          <li style={styles.activityItem}>
            <div style={styles.activityIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <div style={styles.activityContent}>
              <div style={styles.activityTitle}>Nova transação QR code - Linha 553</div>
              <div style={styles.activityTime}>Há 5 minutos</div>
            </div>
          </li>
          <li style={styles.activityItem}>
            <div style={styles.activityIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>
              </svg>
            </div>
            <div style={styles.activityContent}>
              <div style={styles.activityTitle}>Alerta - Veículo 345 fora da rota</div>
              <div style={styles.activityTime}>Há 15 minutos</div>
            </div>
          </li>
          <li style={styles.activityItem}>
            <div style={styles.activityIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div style={styles.activityContent}>
              <div style={styles.activityTitle}>Veículo 287 entrou em manutenção</div>
              <div style={styles.activityTime}>Há 1 hora</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;