// models/TarifaRota.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TarifaRota = sequelize.define('TarifaRota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  timestamps: false
});

// Adicione esta associação após a definição do modelo
TarifaRota.associate = function(models) {
  TarifaRota.belongsTo(models.Tarifa, {
    foreignKey: 'id_tarifa',
    as: 'Tarifa'
  });
};

module.exports = TarifaRota;