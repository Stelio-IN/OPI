const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VeiculoTarifaRota = sequelize.define('VeiculoTarifaRota', {
  id_veiculo_tarifa_rota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Veiculo',
      key: 'id_veiculo'
    }
  },
  id_rota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Rota',
      key: 'id_rota'
    }
  },
  partida: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tarifa: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  qrcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'VeiculoTarifaRota',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id_veiculo', 'id_rota'] // Garante unicidade da combinação
    }
  ]
});

// Associações
VeiculoTarifaRota.belongsTo(require('./Veiculo'), { foreignKey: 'id_veiculo' });
VeiculoTarifaRota.belongsTo(require('./Rota'), { foreignKey: 'id_rota' });

module.exports = VeiculoTarifaRota;