const TarifaRota = require('../models/TarifaRota');
const Rota = require('../models/Rota');
const Tarifa = require('../models/Tarifa');

// Definir associações para o Sequelize
TarifaRota.belongsTo(Rota, { foreignKey: 'id_rota', as: 'rota' });
TarifaRota.belongsTo(Tarifa, { foreignKey: 'id_tarifa', as: 'tarifa' });

// Criar uma nova associação entre Tarifa e Rota
exports.associateTarifaRota = async (req, res) => {
  try {
    const { id_rota, id_tarifa } = req.body;

    // Verificar se a Rota e a Tarifa existem antes de criar a associação
    const rota = await Rota.findByPk(id_rota);
    const tarifa = await Tarifa.findByPk(id_tarifa);

    if (!rota) return res.status(404).json({ error: 'Rota não encontrada' });
    if (!tarifa) return res.status(404).json({ error: 'Tarifa não encontrada' });

    // Criar a associação evitando duplicação
    const [novaAssociacao, created] = await TarifaRota.findOrCreate({
      where: { id_rota, id_tarifa }
    });

    if (!created) {
      return res.status(400).json({ error: 'Associação já existe' });
    }

    res.status(201).json(novaAssociacao);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao associar tarifa e rota', details: error.message });
  }
};

// Obter todas as associações
exports.getAll = async (req, res) => {
  try {
    const tarifaRotas = await TarifaRota.findAll({
      include: [
        { model: Rota, as: 'rota', attributes: ['id_rota', 'origen', 'destino'] },
        { model: Tarifa, as: 'tarifa', attributes: ['id_tarifa', 'valor', 'tipo_cli'] }
      ]
    });
    res.status(200).json(tarifaRotas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar associações', details: error.message });
  }
};

// Obter uma associação por ID
exports.getById = async (req, res) => {
  try {
    const tarifaRota = await TarifaRota.findByPk(req.params.id, {
      include: [
        { model: Rota, as: 'rota', attributes: ['id_rota', 'origen', 'destino'] },
        { model: Tarifa, as: 'tarifa', attributes: ['id_tarifa', 'valor', 'tipo_cli'] }
      ]
    });

    if (!tarifaRota) return res.status(404).json({ error: 'Associação não encontrada' });

    res.status(200).json(tarifaRota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar associação', details: error.message });
  }
};

// Atualizar uma associação
exports.update = async (req, res) => {
  try {
    const { id_rota, id_tarifa } = req.body;
    const tarifaRota = await TarifaRota.findByPk(req.params.id);

    if (!tarifaRota) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }

    // Validar se a nova rota e tarifa existem antes de atualizar
    if (id_rota) {
      const rota = await Rota.findByPk(id_rota);
      if (!rota) return res.status(404).json({ error: 'Nova rota não encontrada' });
    }

    if (id_tarifa) {
      const tarifa = await Tarifa.findByPk(id_tarifa);
      if (!tarifa) return res.status(404).json({ error: 'Nova tarifa não encontrada' });
    }

    await tarifaRota.update(req.body);
    res.status(200).json(tarifaRota);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar associação', details: error.message });
  }
};

// Deletar uma associação
exports.delete = async (req, res) => {
  try {
    const tarifaRota = await TarifaRota.findByPk(req.params.id);
    console.log(req.params)
    if (!tarifaRota) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }

    await tarifaRota.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar associação', details: error.message });
  }
};
