const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  id_funcionario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_instituicao: { type: DataTypes.INTEGER, allowNull: false },
  tipo_funcionario: { 
    type: DataTypes.ENUM('Motorista', 'Cobrador', 'Fiscal', 'Funcionario'), 
    defaultValue: 'Motorista' 
  }, 
  tipo_contrato: { 
    type: DataTypes.ENUM('Parcial', 'Inteiro'), 
    defaultValue: 'Parcial' 
  }, 
  nome: { type: DataTypes.STRING, allowNull: false },
  apelido: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  celular: { type: DataTypes.STRING },
  morada:{ type: DataTypes.STRING },
  bi:{ type: DataTypes.STRING },
  nuit:{ type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  status: { 
    type: DataTypes.ENUM('Activo', 'Inactivo'), 
    defaultValue: 'Activo' 
  }, 
});

module.exports = Funcionario;
