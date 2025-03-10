const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QrCode = sequelize.define('QrCode', {
  id_qr: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_veiculo: { type: DataTypes.INTEGER, allowNull: false },
  id_tarifa: { type: DataTypes.INTEGER, allowNull: false },
  codigo_qr: { type: DataTypes.STRING, allowNull: false }
});

module.exports = QrCode;
