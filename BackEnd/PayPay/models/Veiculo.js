const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  id_instituicao: { type: DataTypes.INTEGER, allowNull: false },
  id_rota: { type: DataTypes.INTEGER, allowNull: false },
  matricula: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.STRING },
  capacidade: { type: DataTypes.INTEGER },
  cod_unic_pagament: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING }
});

module.exports = Veiculo;
