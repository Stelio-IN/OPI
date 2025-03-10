import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaSecundaria, setSenhaSecundaria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Função para tratar o envio do formulário de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpar a mensagem de erro anterior
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3005/api/admin/login', {
        email,
        senha,
        senha_secundaria: senhaSecundaria,
      });

      if (response.status === 200) {
        // Se o login for bem-sucedido, redireciona para o dashboard
        navigate('/dashboardadmin');
      }
    } catch (error) {
      // Se ocorrer um erro durante o login, exibe a mensagem de erro
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao realizar login.');
      } else {
        setErrorMessage('Erro desconhecido ao realizar login.');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '24px'
        }}>Login Admin</h2>
        
        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#555'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
              required
            />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#555'
            }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
              required
            />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#555'
            }}>Senha Secundária</label>
            <input
              type="password"
              value={senhaSecundaria}
              onChange={(e) => setSenhaSecundaria(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
              required
            />
          </div>
          
          {errorMessage && (
            <div style={{
              color: '#d32f2f',
              backgroundColor: '#ffebee',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {errorMessage}
            </div>
          )}
          
          <button 
            type="submit"
            style={{
              backgroundColor: '#4285f4',
              color: 'white',
              padding: '12px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;