const Rota = require('../models/Rota'); // Use "Rota" com letra maiúscula para evitar conflitos

// Criar uma nova rota
exports.create = async (req, res) => {
  try {
    const novaRota = await Rota.create(req.body); // Use "novaRota" em vez de "rota"
    res.status(201).json(novaRota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar rota', details: error.message });
  }
};

// Listar todas as rotas
exports.getAll = async (req, res) => {
  try {
    const rotas = await Rota.findAll();
    res.status(200).json(rotas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar rotas', details: error.message });
  }
};

// Obter uma rota por ID
exports.getById = async (req, res) => {
  try {
    const rota = await Rota.findByPk(req.params.id);
    if (!rota) {
      return res.status(404).json({ error: 'Rota não encontrada' });
    }
    res.status(200).json(rota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar rota', details: error.message });
  }
};
// Atualizar uma rota
exports.update = async (req, res) => {
  try {
    const id_rota = req.query.id_rota; // Usar query parameter
    const rota = await Rota.findByPk(id_rota);
    if (!rota) {
      return res.status(404).json({ error: 'Rota não encontrada' });
    }
    await rota.update(req.body); // Atualiza os dados da rota com o corpo da requisição
    res.status(200).json(rota); // Retorna a rota atualizada
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar rota', details: error.message });
  }
};

// Deletar uma rota
exports.delete = async (req, res) => {
  try {
    const id_rota = req.query.id_rota; // Usar query parameter
    const rota = await Rota.findByPk(id_rota);
    if (!rota) {
      return res.status(404).json({ error: 'Rota não encontrada' });
    }
    await rota.destroy(); // Corrigido para deletar a rota específica
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar rota', details: error.message });
  }
};