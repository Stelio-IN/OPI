const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TarifaRota = sequelize.define('TarifaRota', {
  id_tarifa: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Tarifas',
      key: 'id_tarifa'
    }
  },
  id_rota: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Rota',
      key: 'id_rota'
    }
  }
}, {
  tableName: 'TarifaRota',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id_tarifa', 'id_rota'] // Impede associações duplicadas
    }
  ]
});

module.exports = TarifaRota;
