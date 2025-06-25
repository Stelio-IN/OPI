import React, { useState } from 'react';
import { LayoutDashboard, Building, MapPinned, DollarSign, Repeat, LogOut, Menu, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  handleNavigation: (section: string) => void;
}

// Componente do ícone SamPay
const SamPayIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      
      {/* Container principal */}
      <rect 
        x="1" 
        y="1" 
        width="30" 
        height="30" 
        rx="6" 
        fill="url(#iconGradient)"
      />
      
      {/* Ícone de transporte */}
      <g transform="translate(6, 6)">
        {/* Roda traseira */}
        <circle cx="3" cy="13" r="3" fill="white" opacity="0.9"/>
        <circle cx="3" cy="13" r="2" fill="#1e40af"/>
        
        {/* Roda dianteira */}
        <circle cx="13" cy="13" r="3" fill="white" opacity="0.9"/>
        <circle cx="13" cy="13" r="2" fill="#1e40af"/>
        
        {/* Carroceria do veículo */}
        <path 
          d="M 1 10 L 15 10 L 17 6 L 17 3 L 12 3 L 11 4 L 3 4 L 1 10 Z" 
          fill="white" 
          opacity="0.9"
        />
        
        {/* Detalhes do veículo */}
        <rect x="4" y="6" width="2.5" height="2" fill="#1e40af" opacity="0.7"/>
        <rect x="7.5" y="6" width="2.5" height="2" fill="#1e40af" opacity="0.7"/>
        
        {/* Linha de movimento */}
        <path 
          d="M 18 8 L 20 8 M 18 10 L 20 10" 
          stroke="white" 
          strokeWidth="1" 
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, handleNavigation }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} h-screen flex flex-col fixed left-0 top-0 z-10`}>
      {/* Logo + Botão de Expandir/Encolher */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <SamPayIcon size={32} />
            <span className="text-xl font-bold text-indigo-800">SamPay</span>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <SamPayIcon size={28} />
          </div>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-indigo-800 hover:text-indigo-900 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        <MenuItem
          section="dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          collapsed={collapsed}
        />
        <MenuItem
          section="instituicoes"
          icon={<Building size={20} />}
          label="Instituições"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          collapsed={collapsed}
        />
        <MenuItem
          section="rotas"
          icon={<MapPinned size={20} />}
          label="Rotas"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          collapsed={collapsed}
        />
        <MenuItem
          section="tarifas"
          icon={<DollarSign size={20} />}
          label="Tarifas"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          collapsed={collapsed}
        />
        <MenuItem
          section="rotaTarifa"
          icon={<ArrowLeftRight size={20} />}
          label="Rota-Tarifa"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          collapsed={collapsed}
        />
        
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200">
      <button
    onClick={() => navigate('/logout')} // redireciona para /logout
    className={`flex items-center w-full px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
  >
    <LogOut size={20} />
    {!collapsed && <span className="ml-3 text-sm">Encerrar Sessão</span>}
  </button>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{
  section: string;
  activeSection: string;
  handleNavigation: (section: string) => void;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}> = ({ section, activeSection, handleNavigation, icon, label, collapsed }) => {
  const isActive = activeSection === section;

  return (
    <button
      onClick={() => handleNavigation(section)}
      className={`flex items-center w-full px-4 py-3 text-indigo-600 text-sm ${
        isActive ? 'bg-indigo-100 border-r-2 border-indigo-600 font-medium' : ''
      } hover:bg-indigo-50 transition-all duration-200 ${collapsed ? 'justify-center px-2' : ''}`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      {!collapsed && <span className="ml-3">{label}</span>}
    </button>
  );
};

export default Sidebar;