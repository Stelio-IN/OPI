const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viagem = sequelize.define('Viagem', {
  id_viagem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_veiculo_tarifa_rota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'VeiculoTarifaRota',
      key: 'id_veiculo_tarifa_rota'
    }
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Planejada', 'Em andamento', 'Concluída', 'Cancelada'),
    defaultValue: 'Planejada'
  }
}, {
  tableName: 'Viagem',
  timestamps: true
});

// Associações
Viagem.belongsTo(require('./VeiculoTarifaRota'), { foreignKey: 'id_veiculo_tarifa_rota' });

module.exports = Viagem;