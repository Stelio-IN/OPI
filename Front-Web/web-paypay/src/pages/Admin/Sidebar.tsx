import React from 'react';

interface SidebarProps {
  activeSection: string;
  handleNavigation: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, handleNavigation }) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <div style={styles.logoIcon}>🚌</div>
        <div style={styles.logoText}>TransportePublico</div>
      </div>
      <ul style={styles.menuList}>
        <li style={{
          ...styles.menuItem,
          ...(activeSection === 'dashboard' ? styles.activeMenuItem : {})
        }}>
          <a 
            href="#dashboard" 
            onClick={() => handleNavigation('dashboard')}
            style={styles.menuLink}
          >
            <span style={styles.menuIcon}>📊</span> Dashboard
          </a>
        </li>
        <li style={{
          ...styles.menuItem,
          ...(activeSection === 'instituicoes' ? styles.activeMenuItem : {})
        }}>
          <a 
            href="#instituicoes" 
            onClick={() => handleNavigation('instituicoes')}
            style={styles.menuLink}
          >
            <span style={styles.menuIcon}>🏢</span> Instituições
          </a>
        </li>
        <li style={{
          ...styles.menuItem,
          ...(activeSection === 'rotas' ? styles.activeMenuItem : {})
        }}>
          <a 
            href="#rotas" 
            onClick={() => handleNavigation('rotas')}
            style={styles.menuLink}
          >
            <span style={styles.menuIcon}>🛣️</span> Rotas
          </a>
        </li>
        <li style={{
          ...styles.menuItem,
          ...(activeSection === 'tarifas' ? styles.activeMenuItem : {})
        }}>
          <a 
            href="#tarifas" 
            onClick={() => handleNavigation('tarifas')}
            style={styles.menuLink}
          >
            <span style={styles.menuIcon}>💵</span> Tarifas
          </a>
        </li>
        <li style={{
          ...styles.menuItem,
          ...(activeSection === 'rotaTarifa' ? styles.activeMenuItem : {})
        }}>
          <a 
            href="#rotaTarifa" 
            onClick={() => handleNavigation('rotaTarifa')}
            style={styles.menuLink}
          >
            <span style={styles.menuIcon}>🔄</span> Rota-Tarifa
          </a>
        </li>
      </ul>
      <div style={styles.footerContainer}>
        <div style={styles.divider}></div>
        <a 
          href="#logout" 
          style={styles.logoutButton}
        >
          <span style={styles.logoutIcon}>🚪</span> Encerrar Sessão
        </a>
      </div>
    </div>
  );
};

// Estilos CSS internos com cores suaves
const styles = {
  sidebar: {
    width: '280px',
    height: '100vh',
    position: 'fixed' as 'fixed',
    left: '0',
    top: '0',
    backgroundColor: '#EEF2FF', // Azul muito claro (indigo-50)
    color: '#4338CA', // Indigo-700 para o texto
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column' as 'column',
    overflow: 'hidden',
    borderRight: '1px solid #E0E7FF' // Indigo-100
  },
  logoContainer: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#C7D2FE', // Indigo-200
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
    height: '80px'
  },
  logoIcon: {
    fontSize: '28px',
    marginRight: '10px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold' as 'bold',
    letterSpacing: '0.5px',
    color: '#3730A3' // Indigo-800
  },
  menuList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    flexGrow: 1,
    overflowY: 'auto' as 'auto'
  },
  menuItem: {
    margin: '4px 0',
    transition: 'all 0.2s ease'
  },
  activeMenuItem: {
    backgroundColor: '#A5B4FC', // Indigo-300
    borderLeft: '4px solid #6366F1', // Indigo-500
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    textDecoration: 'none',
    color: '#4F46E5', // Indigo-600
    fontSize: '15px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#C7D2FE' // Indigo-200
    }
  },
  menuIcon: {
    marginRight: '12px',
    fontSize: '18px',
    width: '24px',
    textAlign: 'center' as 'center'
  },
  menuItemSchedule: {
    margin: '4px 0',
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // Indigo muito transparente
    borderRadius: '4px',
    margin: '10px 8px'
  },
  menuItemVehicles: {
    margin: '4px 0',
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // Indigo muito transparente
    borderRadius: '4px',
    margin: '0 8px 10px 8px'
  },
  footerContainer: {
    padding: '10px 0',
    marginTop: 'auto'
  },
  divider: {
    height: '1px',
    backgroundColor: '#E0E7FF', // Indigo-100
    margin: '10px 0'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    textDecoration: 'none',
    color: '#4F46E5', // Indigo-600
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#C7D2FE' // Indigo-200
    }
  },
  logoutIcon: {
    marginRight: '12px',
    fontSize: '18px'
  }
};

export default Sidebar;