import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, TruckIcon, UsersIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import DashboardRoutes from '../../components/DashboardRoutes';
import SamPayIcon from '../../components/SamPayIcon'; // certifique-se do caminho correto

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.endsWith(path);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className={`bg-[#1a2233] text-white transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center border-b border-[#2c3a5a] p-4">
          <button className="text-white p-2" onClick={() => setCollapsed(!collapsed)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed ? (
                <>
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </>
              ) : (
                <>
                  <polyline points="15 18 9 12 15 6" />
                </>
              )}
            </svg>
          </button>
          {!collapsed && (
            <div className="flex items-center ml-3 space-x-2">
              <SamPayIcon size={28} />
              <span className="text-xl font-bold whitespace-nowrap">SamPay</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col py-4 flex-1">
          <Link
            to="/dashboard/home"
            className={`flex items-center px-4 py-3 text-sm hover:bg-[#2d3a50] transition 
              ${isActive('home') ? 'bg-[#2d3a50] text-white border-l-4 border-blue-500' : 'text-gray-400'}`}
          >
            <HomeIcon className={`w-6 h-6 ${isActive('home') ? 'text-white' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Home</span>}
          </Link>

          <Link
            to="/dashboard/fleet"
            className={`flex items-center px-4 py-3 text-sm hover:bg-[#2d3a50] transition 
              ${isActive('fleet') ? 'bg-[#2d3a50] text-white border-l-4 border-blue-500' : 'text-gray-400'}`}
          >
            <TruckIcon className={`w-6 h-6 ${isActive('fleet') ? 'text-white' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Frota</span>}
          </Link>

          <Link
            to="/dashboard/employees"
            className={`flex items-center px-4 py-3 text-sm hover:bg-[#2d3a50] transition 
              ${isActive('employees') ? 'bg-[#2d3a50] text-white border-l-4 border-blue-500' : 'text-gray-400'}`}
          >
            <UsersIcon className={`w-6 h-6 ${isActive('employees') ? 'text-white' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Funcionários</span>}
          </Link>

          <Link
            to="/dashboard/perfil"
            className={`flex items-center px-4 py-3 text-sm hover:bg-[#2d3a50] transition 
              ${isActive('perfil') ? 'bg-[#2d3a50] text-white border-l-4 border-blue-500' : 'text-gray-400'}`}
          >
            <UserCircleIcon className={`w-6 h-6 ${isActive('perfil') ? 'text-white' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Perfil</span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t border-[#2c3a5a] p-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-400 hover:text-white w-full"
          >
            <ArrowRightOnRectangleIcon className={`w-6 h-6 text-gray-400 hover:text-white ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-col flex-1 bg-[#f7f9fc]">
        <header className="bg-white px-6 py-4 shadow flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 m-0">Dashboard</h1>
          <div className="flex items-center">
            <span>Administrador</span>
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center ml-3">
              SamPay
            </div>
          </div>
        </header>

        <div className="p-6 flex-1">
          <DashboardRoutes />
        </div>

        <footer className="text-sm text-gray-500 text-center py-3 border-t border-gray-200">
          © 2025 SamPay - Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
}