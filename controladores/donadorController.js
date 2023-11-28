const models = require('../models');

const getAll = async function(req, res) {
  try {
    let donadores = await models.Donadores.findAll();
    res.json(donadores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todos los donadores' });
  }
};

const getById = async function(req, res) {
  try {
    const donadores = await models.Donadores.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (donadores) {
      await res.json(donadores);
    } else {
      res.status(404).json({ error: 'Donador no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el Donador por ID' });
  }
};

const eliminar = async function(req, res) {
  try {
    const donador = await models.Donadores.destroy({
      where: {
        id: req.params.id
      }
    });
    if (donador) {
      res.json({ message: 'Donador eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Donador no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar donador' });
  }
}
const editar = async function(req, res) {
  try {
    const donadorExistente = await models.Donadores.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!donadorExistente) {
      return res.status(404).json({ error: 'Donador no encontrado' });
    }

    const donadorActualizado = await donadorExistente.update(req.body);

    res.json(donadorActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const add = async function(req, res) {
  try {
    const donador = await models.Donadores.create(req.body);
    res.json(donador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar un donador' });
  }
};
exports.getAll=getAll;
exports.getById=getById;
exports.add=add;
exports.eliminar=eliminar;
exports.editar=editar;