const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
  id_pagamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_viagem: { type: DataTypes.INTEGER, allowNull: false },
  valor_pago: { type: DataTypes.FLOAT, allowNull: false },
  data_pagamento: { type: DataTypes.DATE, allowNull: false },
  quant: { type: DataTypes.INTEGER, allowNull: false }
});


module.exports = Pagamento;
