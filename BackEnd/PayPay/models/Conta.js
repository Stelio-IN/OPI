const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conta = sequelize.define('Conta', {
  id_conta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_instituicao: { type: DataTypes.INTEGER, allowNull: false },
  saldo: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Conta;
