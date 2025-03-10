const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Passageiro = sequelize.define('Passageiro', {
  id_passageiro: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Passageiro;
