const bcrypt = require('bcryptjs');
const Funcionario = require('../models/Funcionario');

// Criar um novo funcionário
exports.create = async (req, res) => {
  try {
    const { password, ...dados } = req.body;

    // Hash da senha, se fornecida
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const funcionario = await Funcionario.create({
      ...dados,
      password: hashedPassword,
    });

    const { password: _, ...funcionarioSemSenha } = funcionario.dataValues;
    res.status(201).json(funcionarioSemSenha);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar funcionário', details: error.message });
  }
};


// Listar todos os funcionários
exports.getAll = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar funcionários', details: error.message });
  }
};

// Obter um funcionário por ID
exports.getById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

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

    const { password, ...dadosAtualizados } = req.body;

    // Atualizar senha, se fornecida
    if (password) {
      dadosAtualizados.password = await bcrypt.hash(password, 10);
    }

    await funcionario.update(dadosAtualizados);
    const { password: _, ...funcionarioSemSenha } = funcionario.dataValues;

    res.status(200).json(funcionarioSemSenha);
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


// Login do funcionário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificação básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Buscar funcionário pelo email
    const funcionario = await Funcionario.findOne({ where: { email } });

    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado.' });
    }

    // Verificar a senha
    const senhaCorreta = await bcrypt.compare(password, funcionario.password);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Remover a senha antes de retornar os dados
    const { password: _, ...funcionarioSemSenha } = funcionario.dataValues;

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      funcionario: funcionarioSemSenha
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', details: error.message });
  }
};