const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const Instituicao = require('../models/Instituicao');

// Criar uma nova instituição
exports.create = async (req, res) => {
  try {
    const { nome, email, senha, localizacao } = req.body;

    const existing = await Instituicao.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'O email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const instituicao = await Instituicao.create({
      nome,
      email,
      senha: hashedPassword,
      localizacao
    });

    const { senha: _, ...instituicaoSemSenha } = instituicao.toJSON();

    res.status(201).json({ message: 'Instituição criada com sucesso!', instituicao: instituicaoSemSenha });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar instituição', details: error.message });
  }
};

// Login da instituição
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const instituicao = await Instituicao.findOne({ where: { email } });
    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    const isMatch = await bcrypt.compare(senha, instituicao.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const { senha: _, ...instituicaoSemSenha } = instituicao.toJSON();

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      instituicao: instituicaoSemSenha,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login.', details: error.message });
  }
};

// Listar todas as instituições
exports.getAll = async (req, res) => {
  try {
    const instituicoes = await Instituicao.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.status(200).json(instituicoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar instituições', details: error.message });
  }
};

// Obter instituição por ID
exports.getById = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
    });

    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    res.status(200).json(instituicao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar instituição', details: error.message });
  }
};

// Atualizar uma instituição
exports.update = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);

    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    // Evita atualizar senha diretamente aqui
    if (req.body.senha) {
      delete req.body.senha;
    }

    await instituicao.update(req.body);
    const { senha: _, ...instituicaoSemSenha } = instituicao.toJSON();

    res.status(200).json({ message: 'Instituição atualizada com sucesso.', instituicao: instituicaoSemSenha });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar instituição', details: error.message });
  }
};

// Deletar uma instituição
exports.delete = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);

    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    await instituicao.destroy();
    res.status(200).json({ message: 'Instituição removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar instituição', details: error.message });
  }
};
