const sequelize = require('../config/database');
const Funcionario = require('./Funcionario');
const Passageiro = require('./Passageiro');
const Instituicao = require('./Instituicao');
const Pagamento = require('./Pagamento');
const QrCode = require('./Qrcode');
const Rota = require('./Rota');
const Tarifa = require('./Tarifa');
const Veiculo = require('./Veiculo');

// Sincronizando o banco de dados
const syncDatabase = async () => {
  try {
    // Sincronizando todos os modelos com o banco de dados
    await sequelize.sync({ force: true }); // Cuidado! Isto apagará os dados existentes!
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

// Exporte a função de sincronização
module.exports = { syncDatabase };
