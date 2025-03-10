const Funcionario = require('../models/Funcionario');

// Criar um novo funcionário
exports.create = async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar funcionário', details: error.message });
  }
};

// Listar todos os funcionários
exports.getAll = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar funcionários', details: error.message });
  }
};

// Obter um funcionário por ID
exports.getById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar funcionário', details: error.message });
  }
};

// Atualizar um funcionário
exports.update = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    await funcionario.update(req.body);
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar funcionário', details: error.message });
  }
};

// Deletar um funcionário
exports.delete = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    await funcionario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar funcionário', details: error.message });
  }
};
