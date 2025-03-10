const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TarifaRota = sequelize.define('TarifaRota', {
  id_tarifa: { type: DataTypes.INTEGER, allowNull: false },
  id_rota: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = TarifaRota;
