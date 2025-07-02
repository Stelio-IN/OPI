// src/components/DashboardRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from '../pages/Instituicao/DashboardHome';
import Fleet from '../pages/Instituicao/Fleet';
import FleetTarif from '../pages/Instituicao/FleetTarif';
import Qr_teste from '../pages/Instituicao/Qr_teste';
import Perfil from '../pages/Instituicao/Perfil';
import Employees from '../pages/Instituicao/Employees';
import Viagem from '../pages/Instituicao/Viagem';
import Pagamento from '../pages/Instituicao/pagamento';

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="home" element={<DashboardHome />} />
      <Route path="fleet" element={<Fleet />} />
      <Route path="fleetTarif" element={<FleetTarif />} />
      <Route path="employees" element={<Employees />} />
      <Route path="qr" element={<Qr_teste />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="viagem" element={<Viagem />} />
      <Route path="pagamento" element={<Pagamento />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}

export default DashboardRoutes;
