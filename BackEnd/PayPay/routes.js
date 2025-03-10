const express = require('express');
const InstituicaoController = require('./controllers/instituicaoController');
const AdminController = require('./controllers/AdminController');

const router = express.Router();

//Instiruicao
router.post('/instituicoes/login', InstituicaoController.login);
router.get('/instituicoes/:id', InstituicaoController.getById);
router.post('/instituicoes', InstituicaoController.create);
router.put('/instituicoes/:id', InstituicaoController.update);
router.delete('/instituicoes/:id', InstituicaoController.delete);

//Admin 
router.post('/admin/login',AdminController.login);

module.exports = router;
