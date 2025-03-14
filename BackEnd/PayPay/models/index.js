const sequelize = require('../config/database');

const Funcionario = require('./Funcionario');
const Passageiro = require('./Passageiro');
const Instituicao = require('./Instituicao');
const Pagamento = require('./Pagamento');
const QrCode = require('./Qrcode');
const Rota = require('./Rota');
const Tarifa = require('./Tarifa');
const TarifaRota = require('./TarifaRota');
const Veiculo = require('./Veiculo');

// Definir associações entre os modelos

// Associação de TarifaRota com Rota e Tarifa
// TarifaRota.belongsTo(Rota, { foreignKey: 'id_rota', as: 'Rota' });
// TarifaRota.belongsTo(Tarifa, { foreignKey: 'id_tarifa', as: 'Tarifa' });

// Rota.hasMany(TarifaRota, { foreignKey: 'id_rota', as: 'TarifasAssociadas' });
// Tarifa.hasMany(TarifaRota, { foreignKey: 'id_tarifa', as: 'RotasAssociadas' });



// Sincronizando o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Cuidado! Isso apagará os dados existentes!
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

// Exportar todos os modelos e a função de sincronização
module.exports = { 
  sequelize, 
  Funcionario, 
  Passageiro, 
  Instituicao, 
  Pagamento, 
  QrCode, 
  Rota, 
  Tarifa, 
  TarifaRota, 
  Veiculo, 
  syncDatabase 
};
