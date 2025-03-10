import React, { useState } from 'react';

// Interfaces
interface Institution {
  id: number;
  name: string;
  address: string;
  contact: string;
  students: number;
}

interface Route {
  id: string;
  origin: string;
  destination: string;
  distance: string;
  status: string;
}

interface Tariff {
  routeId: string;
  type: string;
  value: string;
  validity: string;
}

interface Activity {
  action: string;
  description: string;
  date: string;
}

const AdminDashboard: React.FC = () => {
  // Estado para controlar a seção ativa
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Dados de exemplo
  const institutions: Institution[] = [
    { id: 1, name: 'Universidade Federal', address: 'Av. Principal, 1000', contact: 'contato@univ.edu', students: 12500 },
    { id: 2, name: 'Colégio Santa Maria', address: 'Rua das Flores, 123', contact: 'info@santamaria.edu', students: 850 },
    { id: 3, name: 'Instituto Técnico', address: 'Av. Industrial, 500', contact: 'secretaria@instec.edu', students: 2300 },
  ];

  const routes: Route[] = [
    { id: 'RT-001', origin: 'Terminal Central', destination: 'Universidade Federal', distance: '12 km', status: 'Ativa' },
    { id: 'RT-002', origin: 'Terminal Oeste', destination: 'Colégio Santa Maria', distance: '8 km', status: 'Ativa' },
    { id: 'RT-003', origin: 'Terminal Sul', destination: 'Instituto Técnico', distance: '15 km', status: 'Ativa' },
  ];

  const tariffs: Tariff[] = [
    { routeId: 'RT-001', type: 'Estudante', value: '2,50', validity: '01/03/2025 - 30/06/2025' },
    { routeId: 'RT-002', type: 'Regular', value: '4,75', validity: '01/03/2025 - 31/12/2025' },
    { routeId: 'RT-003', type: 'Idoso', value: '0,00', validity: '01/01/2025 - 31/12/2025' },
  ];

  const activities: Activity[] = [
    { action: 'Atualização', description: 'Tarifa atualizada para a rota São Paulo - Rio de Janeiro', date: '10/03/2025' },
    { action: 'Nova', description: 'Instituição "Colégio Santa Maria" adicionada', date: '09/03/2025' },
    { action: 'Remoção', description: 'Rota "Terminal Central - Vila Nova" desativada', date: '08/03/2025' },
  ];

  // Função para navegar entre seções
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  // CSS Inline
  const styles = {
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
  
  return (
    <div className="flex min-h-screen bg-gray-100" style={styles.container}>
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white fixed h-full" style={styles.sidebar}>
        <div className="p-6 text-2xl font-bold border-b border-blue-500" style={styles.sidebarLogo}>AdminPanel</div>
        <ul className="mt-6" style={styles.sidebarMenu}>
          <li style={{
            ...styles.sidebarItem,
            ...(activeSection === 'dashboard' ? styles.sidebarItemActive : {})
          }}>
            <a 
              href="#dashboard" 
              onClick={() => handleNavigation('dashboard')}
              className="flex items-center px-6 py-3 hover:bg-blue-700"
              style={styles.sidebarLink}
            >
              <span style={styles.sidebarIcon}>📊</span> Dashboard
            </a>
          </li>
          <li style={{
            ...styles.sidebarItem,
            ...(activeSection === 'instituicoes' ? styles.sidebarItemActive : {})
          }}>
            <a 
              href="#instituicoes" 
              onClick={() => handleNavigation('instituicoes')}
              className="flex items-center px-6 py-3 hover:bg-blue-700"
              style={styles.sidebarLink}
            >
              <span style={styles.sidebarIcon}>🏢</span> Instituições
            </a>
          </li>
          <li style={{
            ...styles.sidebarItem,
            ...(activeSection === 'rotas' ? styles.sidebarItemActive : {})
          }}>
            <a 
              href="#rotas" 
              onClick={() => handleNavigation('rotas')}
              className="flex items-center px-6 py-3 hover:bg-blue-700"
              style={styles.sidebarLink}
            >
              <span style={styles.sidebarIcon}>🚌</span> Rotas
            </a>
          </li>
          <li style={{
            ...styles.sidebarItem,
            ...(activeSection === 'tarifas' ? styles.sidebarItemActive : {})
          }}>
            <a 
              href="#tarifas" 
              onClick={() => handleNavigation('tarifas')}
              className="flex items-center px-6 py-3 hover:bg-blue-700"
              style={styles.sidebarLink}
            >
              <span style={styles.sidebarIcon}>💰</span> Tarifas
            </a>
          </li>
          <li className="absolute bottom-6 w-full" style={styles.sidebarItem}>
            <a 
              href="#logout" 
              className="flex items-center px-6 py-3 hover:bg-blue-700"
              style={styles.sidebarLink}
            >
              <span style={styles.sidebarIcon}>🚪</span> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="ml-64 flex-1 p-8" style={styles.mainContent}>
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
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
        )}

        {/* Instituições */}
        {activeSection === 'instituicoes' && (
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
        )}

        {/* Rotas */}
        {activeSection === 'rotas' && (
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
        )}

        {/* Tarifas */}
        {activeSection === 'tarifas' && (
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;