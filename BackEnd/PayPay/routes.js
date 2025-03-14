const express = require('express');
const InstituicaoController = require('./controllers/instituicaoController');
const AdminController = require('./controllers/AdminController');
const TarifaController = require('./controllers/TarifaController');
const RotaController = require('./controllers/RotaController');
const TarifaRotaController = require('./controllers/TarifaRotaController');

const router = express.Router();

//Instiruicao
router.post('/instituicoes/login', InstituicaoController.login);
router.get('/instituicoes', InstituicaoController.getAll);
router.post('/instituicoes', InstituicaoController.create);
router.put('/instituicoes/:id', InstituicaoController.update);
router.delete('/instituicoes/:id', InstituicaoController.delete);

//Admin 
router.post('/admin/login',AdminController.login);


//Rota
router.post('/rota',RotaController.create);
router.get('/rota/all', RotaController.getAll);
router.put('/rota', RotaController.update);
router.delete('/rota', RotaController.delete);

//Tarifa
router.post('/tarifa', TarifaController.create);
router.get('/tarifa/all', TarifaController.getAll);
router.put('/tarifa', TarifaController.update);
router.delete('/tarifa', TarifaController.delete);

//TArifa rota
router.post('/tarifa_rota',TarifaRotaController.associateTarifaRota)
router.get('/tarifa_rota/all',TarifaRotaController.getAll)
router.delete('/tarifa_rota/remove/:id',TarifaRotaController.delete)

module.exports = router;
