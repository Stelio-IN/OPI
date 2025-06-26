import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um email válido');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3005/api/instituicoes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      if (data.instituicao) {
        // Store all authentication data in localStorage
        localStorage.setItem('authData', JSON.stringify({
          token: data.token, // Assuming the token is also returned
          instituicao: data.instituicao,
          lastLogin: new Date().toISOString()
        }));
        
        // Store institution data separately for easy access
        localStorage.setItem('instituicao', JSON.stringify(data.instituicao));
        
        // Store token separately for auth headers
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('authHeader', `Bearer ${data.token}`);
        }

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        throw new Error('Dados da instituição não encontrados na resposta');
      }
    } catch (error) {
      setError(error.message || 'Ocorreu um erro durante o login. Tente novamente.');
      // Clear any partial authentication data on error
      localStorage.removeItem('authData');
      localStorage.removeItem('instituicao');
      localStorage.removeItem('token');
      localStorage.removeItem('authHeader');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-600">TransportPay</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Login</h1>
          <p className="text-gray-600 text-sm">Acesse sua conta para continuar</p>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 rounded-md text-white font-semibold transition 
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Processando...' : 'Entrar'}
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-blue-600">
          <Link to="/" className="hover:underline">Voltar</Link>
          <a href="#" className="hover:underline">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
}