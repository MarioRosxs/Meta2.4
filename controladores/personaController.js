// personaController.js

const models = require('../models');

const getAll = async function(req, res) {
  try {
    let personas = await models.Persona.findAll();
    await res.json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todas las personas' });
  }
}

const getByRFC = async function(req, res) {
  try {
    const persona = await models.Persona.findOne({
      where: {
        rfc: req.params.rfc,
      },
    });

    if (persona) {
      await res.json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la persona por RFC' });
  }
};


const add = async function(req, res) {
  try {
    const persona = await models.Persona.create(req.body);
    await res.json(persona);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar una persona' });
  }
};


const eliminar = async function(req, res) {
  try {
    const persona = await models.Persona.destroy({
      where: {
        id: req.params.id
      }
    });
    if (persona) {
      res.json({ message: 'Persona eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la persona' });
  }
}


const editar = async function(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const personaExistente = await models.Persona.findOne({ where: { id } });

    if (!personaExistente) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const personaActualizada = await personaExistente.update(body);

    res.json(personaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}





exports.getAll=getAll;
exports.getByRFC=getByRFC;
exports.add=add;
exports.eliminar=eliminar;
exports.editar=editar;
