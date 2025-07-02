const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  id_veiculo: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_instituicao: { type: DataTypes.INTEGER, allowNull: false },
  matricula: { type: DataTypes.STRING, allowNull: false, unique: true },
  modelo: { type: DataTypes.STRING, allowNull: true },
  marca: { type: DataTypes.STRING, allowNull: true },
  ano_fabrico: { type: DataTypes.INTEGER, allowNull: true },
  capacidade: { type: DataTypes.INTEGER, allowNull: false },
  tipo_combustivel: { type: DataTypes.STRING, allowNull: true },
  estado_operacional: {
    type: DataTypes.ENUM('Operacional', 'Em manutenção', 'Inativo'),
    defaultValue: 'Operacional'
  },
  cor: { type: DataTypes.STRING, allowNull: true },
  observacoes: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'Veiculo', // <- Fixar nome da tabela aqui!
  timestamps: false     // Opcional: evitar createdAt/updatedAt se não usar
});

module.exports = Veiculo;
