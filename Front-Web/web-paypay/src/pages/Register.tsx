import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    localizacao: ''
  });
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
    registerCard: {
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
    success: {
      color: '#0f9d58',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação simples
    if (!formData.nome || !formData.email || !formData.senha || !formData.localizacao) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, informe um email válido');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3005/api/instituicoes', formData);
      
      // Redirecionar ou mostrar mensagem de sucesso
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao cadastrar instituição.');
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerCard}>
        <div style={styles.logo}>
          <span style={styles.logoText}>TransportPay</span>
        </div>
        <div style={styles.header}>
          <h1 style={styles.title}>Cadastro de Instituição</h1>
          <p style={styles.subtitle}>Registre sua instituição de transporte</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="nome" style={styles.label}>Nome da Instituição</label>
            <input
              type="text"
              id="nome"
              name="nome"
              style={styles.input}
              value={formData.nome}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Nome da sua instituição"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="contato@instituicao.com"
              autoComplete="email"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="senha" style={styles.label}>Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              style={styles.input}
              value={formData.senha}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="localizacao" style={styles.label}>Localização</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              style={styles.input}
              value={formData.localizacao}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Cidade/Estado"
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
            {loading ? 'Processando...' : 'Cadastrar'}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/login" style={styles.link}>Já tem uma conta? Faça login</Link>
          <Link to="/" style={styles.link}>Voltar</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;