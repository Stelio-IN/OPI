const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
  id_pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_bilhete: { type: DataTypes.INTEGER, allowNull: false },
  id_conta: { type: DataTypes.INTEGER, allowNull: false },
  valor_pago: { type: DataTypes.FLOAT, allowNull: false },
  data_pagamento: { type: DataTypes.DATE, allowNull: false },
  id_qr: { type: DataTypes.INTEGER, allowNull: false },
  id_passageiro: { type: DataTypes.INTEGER, allowNull: false },
  quant: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Pagamento;
