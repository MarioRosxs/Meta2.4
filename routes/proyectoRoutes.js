const express = require('express');
const router = express.Router();
const proyectoController = require('../controladores/proyectoController'); // Asegúrate de importar el controlador adecuadamente

router.get('/', proyectoController.getAll);
router.get('/:id', proyectoController.getById);
router.post('/', proyectoController.add);
router.delete('/:id', proyectoController.eliminar);
router.put('/:id', proyectoController.editar);

module.exports = router;
