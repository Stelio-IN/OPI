// src/components/DashboardRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from '../pages/Instituicao/DashboardHome';
import Fleet from '../pages/Instituicao/Fleet';
import Perfil from '../pages/Instituicao/Perfil';
import Employees from '../pages/Instituicao/Employees';

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="home" element={<DashboardHome />} />
      <Route path="fleet" element={<Fleet />} />
      <Route path="employees" element={<Employees />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
}

export default DashboardRoutes;
