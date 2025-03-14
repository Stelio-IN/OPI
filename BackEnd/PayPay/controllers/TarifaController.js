const tarifa = require('../models/Tarifa');

// Criar um novo pagamento
exports.create = async (req, res) => {
  try {
    const pagamento = await tarifa.create(req.body);
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pagamento', details: error.message });
  }
};

// Listar todos os pagamentos
exports.getAll = async (req, res) => {
  try {
    const pagamentos = await tarifa.findAll();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar pagamentos', details: error.message });
  }
};

// Obter um pagamento por ID
exports.getById = async (req, res) => {
  try {
    const pagamento = await tarifa.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: 'tarifa não encontrado' });
    }
    res.status(200).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar pagamento', details: error.message });
  }
};


// Atualizar uma tarifa
exports.update = async (req, res) => {
  try {
    const tarifaId = req.query.id_tarifa; // Usar query parameter
    const tarifaToUpdate = await tarifa.findByPk(tarifaId);
    if (!tarifaToUpdate) {
      return res.status(404).json({ error: 'Tarifa não encontrada' });
    }
    await tarifaToUpdate.update(req.body);
    res.status(200).json(tarifaToUpdate);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar tarifa', details: error.message });
  }
};

// Deletar uma tarifa
exports.delete = async (req, res) => {
  try {
    const tarifaId = req.query.id_tarifa; // Usar query parameter
    const tarifaToDelete = await tarifa.findByPk(tarifaId);
    if (!tarifaToDelete) {
      return res.status(404).json({ error: 'Tarifa não encontrada' });
    }
    await tarifaToDelete.destroy(); // Corrigido para deletar a tarifa específica
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar tarifa', details: error.message });
  }
};
