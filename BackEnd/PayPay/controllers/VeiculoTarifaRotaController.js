const VeiculoTarifaRota = require('../models/VeiculoTarifaRota');
const QRCode = require('qrcode');
const Rota = require('../models/Rota');
const TarifaRota = require('../models/TarifaRota');
const Tarifa = require('../models/Tarifa');

const Veiculo = require('../models/Veiculo');

// controllers/VeiculoTarifaRotaController.js
exports.create = async (req, res) => {
  try {
    const { id_veiculo, id_rota } = req.body;

    // Buscar informações necessárias
    const [rota, tarifaRota, veiculo] = await Promise.all([
      Rota.findByPk(id_rota),
      TarifaRota.findOne({
        where: { id_rota },
        include: [{
          model: Tarifa,
          as: 'Tarifa',
          required: true
        }]
      }),
      Veiculo.findByPk(id_veiculo)
    ]);

    // Validações
    if (!rota) return res.status(404).json({ error: 'Rota não encontrada' });
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });
    if (!tarifaRota) {
      return res.status(404).json({ error: 'Tarifa para esta rota não encontrada' });
    }

    // Gerar QR Code
    const qrContent = JSON.stringify({
      veiculoId: id_veiculo,
      rotaId: id_rota,
      origem: rota.origen,
      destino: rota.destino,
      tarifa: tarifaRota.Tarifa.valor,
      data: new Date().toISOString()
    });

    const qrCodeString = await QRCode.toString(qrContent, { type: 'svg' });

    // Criar nova associação
    const novaAssociacao = await VeiculoTarifaRota.create({
      id_veiculo,
      id_rota,
      partida: rota.origen,
      destino: rota.destino,
      tarifa: tarifaRota.Tarifa.valor,
      qrcode: qrCodeString
    });

    res.status(201).json(novaAssociacao);

  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: error.message 
    });
  }
};

// Listar todas as associações VeiculoTarifaRota
exports.getAll = async (req, res) => {
  try {
    const veiculoTarifaRotas = await VeiculoTarifaRota.findAll({
    include: [
  { model: Veiculo },
  { model: Rota }
]
    });
    res.status(200).json(veiculoTarifaRotas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar associações VeiculoTarifaRota', details: error.message });
  }
};

// Obter uma associação VeiculoTarifaRota por ID
exports.getById = async (req, res) => {
  try {
    const veiculoTarifaRota = await VeiculoTarifaRota.findByPk(req.params.id, {
   include: [
  { model: Veiculo },
  { model: Rota }
]
    });
    if (!veiculoTarifaRota) {
      return res.status(404).json({ error: 'Associação VeiculoTarifaRota não encontrada' });
    }
    res.status(200).json(veiculoTarifaRota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar associação VeiculoTarifaRota', details: error.message });
  }
};

// Atualizar uma associação VeiculoTarifaRota
exports.update = async (req, res) => {
  try {
    const veiculoTarifaRotaId = req.query.id_veiculo_tarifa_rota;
    const veiculoTarifaRota = await VeiculoTarifaRota.findByPk(veiculoTarifaRotaId);
    if (!veiculoTarifaRota) {
      return res.status(404).json({ error: 'Associação VeiculoTarifaRota não encontrada' });
    }

    // Se atualizar id_rota, atualizar partida, destino e tarifa
    if (req.body.id_rota) {
      const rota = await Rota.findByPk(req.body.id_rota);
      if (!rota) {
        return res.status(404).json({ error: 'Rota não encontrada' });
      }
      const tarifaRota = await TarifaRota.findOne({
        where: { id_rota: req.body.id_rota },
        include: [{ model: Tarifa }]
      });
      if (!tarifaRota || !tarifaRota.Tarifa) {
        return res.status(404).json({ error: 'Tarifa associada à rota não encontrada' });
      }
      req.body.partida = rota.origen;
      req.body.destino = rota.destino;
      req.body.tarifa = tarifaRota.Tarifa.valor;
    }

    // Não permitir atualização do qrcode para mantê-lo permanente
    delete req.body.qrcode;

    await veiculoTarifaRota.update(req.body);
    res.status(200).json(veiculoTarifaRota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar associação VeiculoTarifaRota', details: error.message });
  }
};

// Deletar uma associação VeiculoTarifaRota
exports.delete = async (req, res) => {
  try {
    const veiculoTarifaRotaId = req.query.id_veiculo_tarifa_rota;
    const veiculoTarifaRota = await VeiculoTarifaRota.findByPk(veiculoTarifaRotaId);
    if (!veiculoTarifaRota) {
      return res.status(404).json({ error: 'Associação VeiculoTarifaRota não encontrada' });
    }
    await veiculoTarifaRota.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar associação VeiculoTarifaRota', details: error.message });
  }
};