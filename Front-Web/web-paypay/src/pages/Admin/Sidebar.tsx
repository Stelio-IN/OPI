import React from 'react';
import { styles } from './AdminDashboard';

interface SidebarProps {
  activeSection: string;
  handleNavigation: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, handleNavigation }) => {
  return (
    <div className="w-64 bg-blue-600 text-white fixed h-full" style={styles.sidebar}>
      <div className="p-6 text-2xl font-bold border-b border-blue-500" style={styles.sidebarLogo}>
        AdminPanel
      </div>
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
  );
};

export default Sidebar;