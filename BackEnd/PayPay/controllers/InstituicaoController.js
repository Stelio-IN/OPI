const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const Instituicao = require('../models/Instituicao');

// Criar uma nova instituição
exports.create = async (req, res) => {
  try {
    const { nome, email, senha, localizacao } = req.body;

    // Verifica se o email já está em uso
    const existingInstituicao = await Instituicao.findOne({ where: { email } });
    if (existingInstituicao) {
      return res.status(400).json({ message: 'O email já está em uso.' });
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    // Criação da instituição
    const instituicao = await Instituicao.create({
      nome,
      email,
      senha: hashedPassword,
      localizacao
    });

    res.status(201).json({ message: 'Instituição criada com sucesso!', instituicao });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar instituição', details: error.message });
  }
};

// Login da instituição
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log(email, senha)
    // Verifica se o email e senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Busca a instituição pelo email
    const instituicao = await Instituicao.findOne({ where: { email } });
    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    // Compara a senha fornecida com a senha criptografada
    const isPasswordValid = await bcrypt.compare(senha, instituicao.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Retorna os dados da instituição sem a senha
    const { senha: _, ...instituicaoSemSenha } = instituicao.dataValues;

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
    const instituicoes = await Instituicao.findAll();
    res.status(200).json(instituicoes);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar instituições', details: error.message });
  }
};

// Obter uma instituição por ID
exports.getById = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);
    if (!instituicao) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    res.status(200).json(instituicao);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar instituição', details: error.message });
  }
};

// Atualizar uma instituição
exports.update = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);
    if (!instituicao) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    await instituicao.update(req.body);
    res.status(200).json(instituicao);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar instituição', details: error.message });
  }
};



// Deletar uma instituição
exports.delete = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);
    if (!instituicao) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    await instituicao.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar instituição', details: error.message });
  }
};
