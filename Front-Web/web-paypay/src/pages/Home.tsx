import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  // Estilos CSS internos
  const styles = {
    welcomeContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a73e8, #0d47a1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    welcomeCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      padding: '32px',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center'
    },
    welcomeHeader: {
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
    paymentOptions: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 600 ? '1fr' : '1fr 1fr',
      gap: '16px',
      marginBottom: '32px'
    },
    paymentOption: {
      backgroundColor: '#e8f0fe',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #d2e3fc',
      transition: 'transform 0.3s ease'
    },
    icon: {
      width: '48px',
      height: '48px',
      margin: '0 auto 8px',
      color: '#1a73e8'
    },
    optionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
      color: '#202124'
    },
    optionDescription: {
      fontSize: '14px',
      color: '#5f6368'
    },
    actions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    loginButton: {
      backgroundColor: '#1a73e8',
      color: 'white',
      textDecoration: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      display: 'block',
      transition: 'background-color 0.3s ease, transform 0.3s ease'
    },
    registerLink: {
      fontSize: '14px',
      color: '#5f6368'
    },
    registerAnchor: {
      color: '#1a73e8',
      textDecoration: 'none'
    },
    footer: {
      marginTop: '32px',
      color: 'white',
      fontSize: '14px',
      opacity: '0.8'
    }
  };

  // Funções para estilização com hover
  const handlePaymentOptionHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
  };

  const handlePaymentOptionLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = '#0d47a1';
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#1a73e8';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleRegisterLinkHover = (e) => {
    e.currentTarget.style.textDecoration = 'underline';
  };

  const handleRegisterLinkLeave = (e) => {
    e.currentTarget.style.textDecoration = 'none';
  };

  return (
    <div style={styles.welcomeContainer}>
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeHeader}>
          <h1 style={styles.title}>Bem-vindo ao TransportPay</h1>
          <p style={styles.subtitle}>Sistema de pagamento rápido para transporte público</p>
        </div>

        <div style={styles.paymentOptions}>
          <div 
            style={styles.paymentOption} 
            onMouseEnter={handlePaymentOptionHover}
            onMouseLeave={handlePaymentOptionLeave}
          >
            <div style={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2m0 0V4m0 16-4-4h14l-4 4m-6-4v1" />
              </svg>
            </div>
            <h2 style={styles.optionTitle}>QR Code</h2>
            <p style={styles.optionDescription}>Pague rapidamente escaneando o QR code</p>
          </div>
          
          <div 
            style={styles.paymentOption}
            onMouseEnter={handlePaymentOptionHover}
            onMouseLeave={handlePaymentOptionLeave}
          >
            <div style={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 style={styles.optionTitle}>USSD</h2>
            <p style={styles.optionDescription}>Utilize códigos USSD para pagamentos sem internet</p>
          </div>
        </div>

        <div style={styles.actions}>
          <Link 
            to="/login" 
            style={styles.loginButton}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Entrar na sua conta
          </Link>
          
          <div style={styles.registerLink}>
            Novo usuário?{' '}
            <a 
              href="/register" 
              style={styles.registerAnchor}
              onMouseEnter={handleRegisterLinkHover}
              onMouseLeave={handleRegisterLinkLeave}
            >
              Registre-se aqui
            </a>
          </div>
        </div>
      </div>
      
      <div style={styles.footer}>
        © 2025 TransportPay - Todos os direitos reservados
      </div>
    </div>
  );
}