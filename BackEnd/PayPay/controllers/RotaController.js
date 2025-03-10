const rota = require('../models/Rota');

// Criar um novo pagamento
exports.create = async (req, res) => {
  try {
    const pagamento = await rota.create(req.body);
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pagamento', details: error.message });
  }
};

// Listar todos os pagamentos
exports.getAll = async (req, res) => {
  try {
    const pagamentos = await rota.findAll();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar pagamentos', details: error.message });
  }
};

// Obter um pagamento por ID
exports.getById = async (req, res) => {
  try {
    const pagamento = await rota.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: 'rota não encontrado' });
    }
    res.status(200).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar pagamento', details: error.message });
  }
};

// Atualizar um pagamento
exports.update = async (req, res) => {
  try {
    const pagamento = await rota.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: 'rota não encontrado' });
    }
    await pagamento.update(req.body);
    res.status(200).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar pagamento', details: error.message });
  }
};

// Deletar um pagamento
exports.delete = async (req, res) => {
  try {
    const pagamento = await rota.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: 'rota não encontrado' });
    }
    await pagamento.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar pagamento', details: error.message });
  }
};
