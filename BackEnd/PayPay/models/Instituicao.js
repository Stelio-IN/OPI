const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Instituicao = sequelize.define('Instituicao', {
  id_instituicao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   imagem_url: { type: DataTypes.STRING },

  status: { 
    type: DataTypes.ENUM('Activo', 'Inactivo'), 
    defaultValue: 'Activo' 
  },  

});

module.exports = Instituicao;
