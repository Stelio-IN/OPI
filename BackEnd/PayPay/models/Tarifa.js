const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarifa = sequelize.define('Tarifa', {
  id_tarifa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  valor: { type: DataTypes.FLOAT, allowNull: false },
  tipo_cli: { type: DataTypes.STRING }
});

module.exports = Tarifa;
