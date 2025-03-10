import React from 'react';

function Employees() {
  const styles = {
    container: {
      padding: '20px', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#2d3748',
    },
    description: {
      marginBottom: '16px',
      color: '#4a5568',
    },
    list: {
      paddingLeft: '20px',
      color: '#4a5568',
    },
    listItem: {
      marginBottom: '8px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gerenciamento de Funcionários</h2>
      <p style={styles.description}>Esta página permitirá gerenciar todos os funcionários do sistema.</p>
      <p style={styles.description}>Funcionalidades a serem implementadas:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Lista de funcionários</li>
        <li style={styles.listItem}>Gerenciamento de permissões</li>
        <li style={styles.listItem}>Histórico de atividades</li>
        <li style={styles.listItem}>Avaliação de desempenho</li>
      </ul>
    </div>
  );
}

export default Employees;