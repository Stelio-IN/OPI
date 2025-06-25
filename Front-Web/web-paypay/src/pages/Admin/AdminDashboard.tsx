import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import Institutions from './Institutions';
import Routes from './Routes';
import Tariffs from './Tariffs';
import RotaTarifa from './RotaTarifa';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} handleNavigation={handleNavigation} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <DashboardMain />
        )}

        {/* Institutions Section */}
        {activeSection === 'instituicoes' && (
          <Institutions />
        )}

        {/* Routes Section */}
        {activeSection === 'rotas' && (
          <Routes />
        )}

        {/* Tariffs Section */}
        {activeSection === 'tarifas' && (
          <Tariffs />
        )}

        {/* Route Tariff Section */}
        {activeSection === 'rotaTarifa' && (
          <RotaTarifa />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;