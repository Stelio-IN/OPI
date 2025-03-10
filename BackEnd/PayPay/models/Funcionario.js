const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  id_funcionario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_instituicao: { type: DataTypes.INTEGER, allowNull: false },
  id_tipo: { type: DataTypes.INTEGER, allowNull: false },
  nome: { type: DataTypes.STRING, allowNull: false },
  apelido: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  celular: { type: DataTypes.STRING },
  endereco: { type: DataTypes.STRING }
});

module.exports = Funcionario;
