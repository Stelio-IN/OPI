const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tipo = sequelize.define('Tipo', {
  id_tipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descricao: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Tipo;
