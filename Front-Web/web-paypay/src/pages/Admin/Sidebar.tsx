import React from 'react';

interface SidebarProps {
  activeSection: string;
  handleNavigation: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, handleNavigation }) => {
  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-indigo-50 text-indigo-700 shadow-sm flex flex-col overflow-hidden border-r border-indigo-100">
      {/* Logo Container */}
      <div className="px-5 py-6 flex items-center bg-indigo-200 shadow-sm h-20">
        <div className="text-2xl mr-3">🚌</div>
        <div className="text-xl font-bold tracking-wide text-indigo-800">Transporte - Publico</div>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 overflow-y-auto">
        <MenuItem
          section="dashboard"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          icon="📊"
          label="Dashboard"
        />
        <MenuItem
          section="instituicoes"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          icon="🏢"
          label="Instituições"
        />
        <MenuItem
          section="rotas"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          icon="🛣️"
          label="Rotas"
        />
        <MenuItem
          section="tarifas"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          icon="💵"
          label="Tarifas"
        />
        <MenuItem
          section="rotaTarifa"
          activeSection={activeSection}
          handleNavigation={handleNavigation}
          icon="🔄"
          label="Rota-Tarifa"
        />
      </ul>

      {/* Footer */}
      <div className="py-3 mt-auto">
        <div className="h-px bg-indigo-100 my-3"></div>
        <a
          href="/"
          className="flex items-center px-5 py-3 text-indigo-600 text-sm cursor-pointer hover:bg-indigo-200 transition-all duration-200"
        >
          <span className="text-lg mr-3">🚪</span> Encerrar Sessão
        </a>
      </div>
    </div>
  );
};

// Componente auxiliar para itens do menu
const MenuItem: React.FC<{
  section: string;
  activeSection: string;
  handleNavigation: (section: string) => void;
  icon: string;
  label: string;
}> = ({ section, activeSection, handleNavigation, icon, label }) => {
  const isActive = activeSection === section;
  
  return (
    <li className={`mx-1 my-1 transition-all ${isActive ? 'bg-indigo-300 border-l-4 border-indigo-500 shadow-sm' : ''}`}>
      <a
        href={`#${section}`}
        onClick={() => handleNavigation(section)}
        className={`flex items-center px-5 py-3 text-indigo-600 text-sm ${isActive ? 'font-medium' : ''} hover:bg-indigo-200 transition-all duration-200`}
      >
        <span className="text-lg mr-3 w-6 text-center">{icon}</span>
        {label}
      </a>
    </li>
  );
};

export default Sidebar;