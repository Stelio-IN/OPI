const Admin = require('../models/Admin'); 
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
  try {
    const { email, senha, senha_secundaria } = req.body;
    console.log(email, senha, senha_secundaria);
    // Verifica se o email, senha e senha_secundaria foram fornecidos
    if (!email || !senha || !senha_secundaria) {
      return res.status(400).json({ message: 'Email, senha e senha secundária são obrigatórios.' });
    }
    // Busca o admin pelo email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin não encontrado.' });
    }
    // Verifica se a senha principal está correta
    const isPasswordValid = await bcrypt.compare(senha, admin.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha principal incorreta.' });
    }
    // Verifica se a senha secundária está correta
    const isSecondaryPasswordValid = await bcrypt.compare(senha_secundaria, admin.senha_secundaria);
    if (!isSecondaryPasswordValid) {
      return res.status(400).json({ message: 'Senha secundária incorreta.' });
    }
    // Retorna os dados do admin sem as senhas
    const { senha: _, senha_secundaria: __, ...adminSemSenhas } = admin.dataValues;
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      admin: adminSemSenhas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login.', details: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { email, senha, senha_secundaria } = req.body;

    const hashedSenha = await bcrypt.hash(senha, 10);
    const hashedSenhaSecundaria = await bcrypt.hash(senha_secundaria, 10);

    const admin = await Admin.create({
      email,
      senha: hashedSenha,
      senha_secundaria: hashedSenhaSecundaria
    });

    res.status(201).json({ message: 'Admin criado com sucesso!', id: admin.id, email: admin.email });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar admin', details: error.message });
  }
};
// Listar todos os admins
exports.getAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar admins', details: error.message });
  }
};

// Obter um admin por ID
exports.getById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar admin', details: error.message });
  }
};

// Atualizar um admin
exports.update = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.update(req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar admin', details: error.message });
  }
};

// Deletar um admin
exports.delete = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar admin', details: error.message });
  }
};
