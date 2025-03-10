const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rota = sequelize.define('Rota', {
  id_rota: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  origen: { type: DataTypes.STRING },
  destino: { type: DataTypes.STRING },
  distancia: { type: DataTypes.FLOAT },
  status: { type: DataTypes.BOOLEAN },
});

module.exports = Rota;
