const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Passageiro = sequelize.define('Passageiro', {
  id_passageiro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  id_tipo: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Passageiro;
