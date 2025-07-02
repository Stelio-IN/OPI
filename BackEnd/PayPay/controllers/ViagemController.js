const Viagem = require('../models/Viagem');

// Criar uma nova viagem
exports.create = async (req, res) => {
  try {
    const viagem = await Viagem.create(req.body);
    res.status(201).json(viagem);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar viagem', details: error.message });
  }
};

// Listar todas as viagens
exports.getAll = async (req, res) => {
  try {
    const viagens = await Viagem.findAll();
    res.status(200).json(viagens);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar viagens', details: error.message });
  }
};

// Obter uma viagem por ID
exports.getById = async (req, res) => {
  try {
    const viagem = await Viagem.findByPk(req.params.id);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    res.status(200).json(viagem);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar viagem', details: error.message });
  }
};

// Atualizar uma viagem
exports.update = async (req, res) => {
  try {
    const viagemId = req.query.id_viagem;
    const viagem = await Viagem.findByPk(viagemId);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    await viagem.update(req.body);
    res.status(200).json(viagem);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar viagem', details: error.message });
  }
};

// Deletar uma viagem
exports.delete = async (req, res) => {
  try {
    const viagemId = req.query.id_viagem;
    const viagem = await Viagem.findByPk(viagemId);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    await viagem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar viagem', details: error.message });
  }
};