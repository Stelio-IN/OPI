const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rota = sequelize.define('Rota', {
  id_rota: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

module.exports = Rota;
