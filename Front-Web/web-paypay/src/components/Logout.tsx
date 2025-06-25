// src/components/Logout.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui você pode limpar tokens/sessões se necessário
    // localStorage.removeItem('token'); // se usar token
    navigate('/');
  }, [navigate]);

  return null; // não renderiza nada
};

export default Logout;
