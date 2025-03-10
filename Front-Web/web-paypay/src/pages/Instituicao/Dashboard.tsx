import React, { useState } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Fleet from './Fleet';
import Employees from './Employees';
import DashboardHome from './DashboardHome';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Função para verificar qual rota está ativa
  const isActive = (path) => {
    return location.pathname.endsWith(path);
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Remover token do localStorage
    localStorage.removeItem('token');
    // Navegar para a página inicial
    navigate('/');
  };

  // Estilos CSS internos
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
      width: collapsed ? '80px' : '250px',
      backgroundColor: '#1a2233',
      color: 'white',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    logo: {
      padding: '20px 16px',
      borderBottom: '1px solid #2c3a5a',
      display: 'flex',
      alignItems: 'center',
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginLeft: '12px',
      whiteSpace: 'nowrap',
      opacity: collapsed ? 0 : 1,
      transition: 'opacity 0.3s ease',
    },
    toggleButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 0',
      flex: 1,
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      color: '#a0aec0',
      textDecoration: 'none',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      position: 'relative',
    },
    menuItemActive: {
      backgroundColor: '#2d3a50',
      color: 'white',
      borderLeft: '4px solid #3182ce',
    },
    menuIcon: {
      width: '24px',
      height: '24px',
      marginRight: '12px',
      display: 'inline-flex',
    },
    menuText: {
      whiteSpace: 'nowrap',
      opacity: collapsed ? 0 : 1,
      transition: 'opacity 0.3s ease',
    },
    content: {
      flex: 1,
      backgroundColor: '#f7f9fc',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    header: {
      backgroundColor: 'white',
      padding: '16px 24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2d3748',
      margin: 0,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4a5568',
      fontWeight: 'bold',
      marginLeft: '12px',
    },
    mainContent: {
      padding: '24px',
      flex: 1,
    },
    footer: {
      padding: '12px 24px',
      borderTop: '1px solid #e2e8f0',
      color: '#718096',
      fontSize: '14px',
      textAlign: 'center',
    },
    logout: {
      marginTop: 'auto',
      padding: '16px',
      borderTop: '1px solid #2c3a5a',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      color: '#a0aec0',
      textDecoration: 'none',
      cursor: 'pointer',
      width: '100%',
      border: 'none',
      backgroundColor: 'transparent',
      textAlign: 'left',
      fontSize: '16px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <button style={styles.toggleButton} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            }
          </button>
          <span style={styles.logoText}>TransportPay</span>
        </div>

        <nav style={styles.menu}>
          <Link to="home" style={{
            ...styles.menuItem,
            ...(isActive('home') ? styles.menuItemActive : {})
          }}>
            <span style={styles.menuIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span style={styles.menuText}>Home</span>
          </Link>

          <Link to="fleet" style={{
            ...styles.menuItem,
            ...(isActive('fleet') ? styles.menuItemActive : {})
          }}>
            <span style={styles.menuIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </span>
            <span style={styles.menuText}>Frota</span>
          </Link>

          <Link to="employees" style={{
            ...styles.menuItem,
            ...(isActive('employees') ? styles.menuItemActive : {})
          }}>
            <span style={styles.menuIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <span style={styles.menuText}>Funcionários</span>
          </Link>
        </nav>

        <div style={styles.logout}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <span style={styles.menuIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span style={styles.menuText}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Dashboard</h1>
          <div style={styles.userInfo}>
            <span>Administrador</span>
            <div style={styles.avatar}>A</div>
          </div>
        </header>

        <div style={styles.mainContent}>
          <Routes>
            <Route path="home" element={<DashboardHome />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="employees" element={<Employees />} />
          </Routes>
        </div>

        <footer style={styles.footer}>
          &copy; 2025 TransportPay - Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
}