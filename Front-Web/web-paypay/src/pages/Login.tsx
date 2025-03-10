import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Estilos CSS internos
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a73e8, #0d47a1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    loginCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      padding: '32px',
      maxWidth: '400px',
      width: '100%'
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '28px',
      color: '#1a73e8',
      marginBottom: '8px',
      fontWeight: '700'
    },
    subtitle: {
      color: '#5f6368',
      fontSize: '16px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#202124'
    },
    input: {
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #dadce0',
      fontSize: '16px',
      outline: 'none',
      transition: 'border 0.3s ease'
    },
    button: {
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '16px',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#0d47a1'
    },
    buttonDisabled: {
      backgroundColor: '#a0c3ff',
      cursor: 'not-allowed'
    },
    error: {
      color: '#d93025',
      fontSize: '14px',
      marginTop: '8px',
      textAlign: 'center'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '24px',
      fontSize: '14px'
    },
    link: {
      color: '#1a73e8',
      textDecoration: 'none'
    },
    logo: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1a73e8'
    }
  };

  // Funções para estilização com hover
  const handleInputFocus = (e) => {
    e.target.style.border = '2px solid #1a73e8';
  };

  const handleInputBlur = (e) => {
    e.target.style.border = '1px solid #dadce0';
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação simples
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um email válido');
      return;
    }

    setLoading(true);

    try {
      // Chamada para a API
      const response = await fetch('http://localhost:3005/api/instituicoes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Se o login for bem-sucedido, salvar token (se houver) e redirecionar
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <span style={styles.logoText}>TransportPay</span>
        </div>
        <div style={styles.header}>
          <h1 style={styles.title}>Login</h1>
          <p style={styles.subtitle}>Acesse sua conta para continuar</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Senha</label>
            <input
              type="password"
              id="password"
              style={styles.input}
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>Voltar</Link>
          <a href="#" style={styles.link}>Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
}