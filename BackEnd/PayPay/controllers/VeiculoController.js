const Veiculo = require('../models/Veiculo');

// Criar um novo veículo
exports.create = async (req, res) => {
  try {
    const veiculo = await Veiculo.create(req.body);
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar veículo', details: error.message });
  }
};

// Listar todos os veículos
exports.getAll = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar veículos', details: error.message });
  }
};

// Obter um veículo por ID
exports.getById = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    res.status(200).json(veiculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar veículo', details: error.message });
  }
};

// Atualizar um veículo
exports.update = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    await veiculo.update(req.body);
    res.status(200).json(veiculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar veículo', details: error.message });
  }
};

// Deletar um veículo
exports.delete = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    await veiculo.destroy(); // Corrigido
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar veículo', details: error.message });
  }
};
