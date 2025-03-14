import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import Institutions from './Institutions';
import Routes from './Routes';
import Tariffs from './Tariffs';
import RotaTarifa from './RotaTarifa';


// CSS Inline para ser compartilhado entre componentes
export const styles = {
  // Variáveis
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#f3f4f6',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  // Componentes
  container: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  sidebar: {
    width: '16rem',
    backgroundColor: '#2563eb',
    color: 'white',
    position: 'fixed',
    height: '100%',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  sidebarLogo: {
    padding: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sidebarMenu: {
    marginTop: '1.5rem',
  },
  sidebarItem: {
    marginBottom: '4px',
    borderLeft: '3px solid transparent',
    transition: 'all 0.3s ease',
  },
  sidebarItemActive: {
    borderLeftColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    transition: 'all 0.3s ease',
  },
  sidebarIcon: {
    marginRight: '0.75rem',
    fontSize: '1.125rem',
  },
  mainContent: {
    marginLeft: '16rem',
    flex: '1',
    padding: '2rem',
    transition: 'all 0.3s ease',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statCard: {
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    backgroundColor: 'white',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '1rem',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#2563eb',
    margin: '0.5rem 0',
  },
  tableContainer: {
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    backgroundColor: 'white',
    padding: '1.5rem',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
  },
  tableHead: {
    backgroundColor: '#f3f4f6',
  },
  tableHeader: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#1f2937',
    borderBottom: '2px solid #e5e7eb',
  },
  tableCell: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  tableRow: {
    ':hover': {
      backgroundColor: '#f9fafb',
    },
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    color: 'white',
    ':hover': {
      backgroundColor: '#1d4ed8',
    },
  },
  buttonText: {
    background: 'none',
    color: '#2563eb',
    padding: '0.25rem 0.5rem',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  buttonDanger: {
    color: '#ef4444',
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'inline-block',
  },
  statusActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
  },
  statusInactive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
  },
};

const AdminDashboard: React.FC = () => {
  // Estado para controlar a seção ativa
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Função para navegar entre seções
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={styles.container}>
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} handleNavigation={handleNavigation} />

      {/* Conteúdo Principal */}
      <div className="ml-64 flex-1 p-8" style={styles.mainContent}>
        {activeSection === 'dashboard' && (
          <DashboardMain/>
        )}

        {activeSection === 'instituicoes' && (
          <Institutions/>
        )}

        {activeSection === 'rotas' && (
          <Routes/>
        )}

        {activeSection === 'tarifas' && (
          <Tariffs/>
        )}
        {activeSection === 'rotaTarifa' && (
          <RotaTarifa/>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;