const tarifa_rota = require('../models/TarifaRota');

// Criar um novo tarifa_rota
exports.create = async (req, res) => {
  try {
    const tarifa_rota = await tarifa_rota.create(req.body);
    res.status(201).json(tarifa_rota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar tarifa_rota', details: error.message });
  }
};

// Listar todos os tarifa_rotas
exports.getAll = async (req, res) => {
  try {
    const tarifa_rotas = await tarifa_rota.findAll();
    res.status(200).json(tarifa_rotas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar tarifa_rotas', details: error.message });
  }
};

// Obter um tarifa_rota por ID
exports.getById = async (req, res) => {
  try {
    const tarifa_rota = await tarifa_rota.findByPk(req.params.id);
    if (!tarifa_rota) {
      return res.status(404).json({ error: 'tarifa_rota não encontrado' });
    }
    res.status(200).json(tarifa_rota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar tarifa_rota', details: error.message });
  }
};

// Atualizar um tarifa_rota
exports.update = async (req, res) => {
  try {
    const tarifa_rota = await tarifa_rota.findByPk(req.params.id);
    if (!tarifa_rota) {
      return res.status(404).json({ error: 'tarifa_rota não encontrado' });
    }
    await tarifa_rota.update(req.body);
    res.status(200).json(tarifa_rota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar tarifa_rota', details: error.message });
  }
};

// Deletar um tarifa_rota
exports.delete = async (req, res) => {
  try {
    const tarifa_rota = await tarifa_rota.findByPk(req.params.id);
    if (!tarifa_rota) {
      return res.status(404).json({ error: 'tarifa_rota não encontrado' });
    }
    await tarifa_rota.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar tarifa_rota', details: error.message });
  }
};
