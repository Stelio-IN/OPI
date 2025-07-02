const express = require('express');
const InstituicaoController = require('./controllers/instituicaoController');
const AdminController = require('./controllers/AdminController');
const TarifaController = require('./controllers/TarifaController');
const RotaController = require('./controllers/RotaController');
const TarifaRotaController = require('./controllers/TarifaRotaController');
const FuncionarioController = require('./controllers/FuncionarioController');
const VeiculoController = require('./controllers/VeiculoController');
const VeiculoTarifaRotaController = require('./controllers/VeiculoTarifaRotaController');
const ViagemController = require('./controllers/ViagemController');
const PagamentoController = require('./controllers/PagamentoController');

const router = express.Router();

//Instiruicao
router.post('/instituicoes/login', InstituicaoController.login);
router.get('/instituicoes', InstituicaoController.getAll);
router.post('/instituicoes', InstituicaoController.create);
router.put('/instituicoes/:id', InstituicaoController.update);
router.delete('/instituicoes/:id', InstituicaoController.delete);

//Admin 
router.post('/admin/login',AdminController.login);
router.post('/admin',AdminController.create);


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

//Funcionarios
router.post('/funcionario',FuncionarioController.create)
router.get('/funcionario',FuncionarioController.getAll)
router.put('/funcionario',FuncionarioController.update)
router.get('/funcionario',FuncionarioController.getById)
router.delete('/funcionario',FuncionarioController.delete)


//Veiculo
router.post('/veiculo',VeiculoController.create)
router.get('/veiculo',VeiculoController.getAll)
router.put('/veiculo',VeiculoController.update)
router.delete('/veiculo',VeiculoController.delete)

//veiculoRtotaTarifa
router.post('/veiculoRota',VeiculoTarifaRotaController.create)
router.get('/veiculoRota',VeiculoTarifaRotaController.getAll)
router.get('/veiculoRota',VeiculoTarifaRotaController.getById)
router.put('/veiculoRota',VeiculoTarifaRotaController.update)
router.delete('/veiculoRota',VeiculoTarifaRotaController.delete)

//Viagens
router.delete('/viagem',ViagemController.delete)
router.post('/viagem',ViagemController.create)
//router.get('/viagem',ViagemController.getById)
router.get('/viagem',ViagemController.getAll)
router.put('/viagem',ViagemController.update)




router.put('/pagamento',PagamentoController.update)
router.post('/pagamento',PagamentoController.create)
router.get('/pagamento',PagamentoController.getAll)
router.delete('/pagamento',PagamentoController.delete)




module.exports = router;
