const models = require('../models');

const getAll = async function(req, res) {
  try {
    let proyectos = await models.Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todas las personas' });
  }
}

const getById = async function(req, res) {
  try {
    const proyecto = await models.Proyecto.findOne({
      where: {
        idProyecto: req.params.id,
      },
    });
    if (proyecto) {
      await res.json(proyecto);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el proyecto por ID' });
  }
};



const add = async function(req, res) {
  try {
    const proyecto = await models.Proyecto.create(req.body);
    res.json(proyecto); // No necesitas usar await aquí
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar un proyecto' });
  }
};



const eliminar = async function(req, res) {
  try {
    const proyectos = await models.Proyecto.destroy({
      where: {
        idProyecto: req.params.id
      }
    });
    if (proyectos) {
      res.json({ message: 'Proyecto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Proyecto' });
  }
}


const editar = async function(req, res) {
  try {
    const proyectoExistente = await models.Proyecto.findOne({
      where: {
        idProyecto: req.params.id,
      },
    });
    if (!proyectoExistente) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const proyectoActualizado = await proyectoExistente.update(req.body);

    res.json(proyectoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}





exports.getAll=getAll;
exports.getById=getById;
exports.add=add;
exports.eliminar=eliminar;
exports.editar=editar;
