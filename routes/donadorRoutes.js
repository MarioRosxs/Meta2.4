const express = require('express');
const router = express.Router();
const donadorController = require('../controladores/donadorController'); // Asegúrate de importar el controlador adecuadamente

router.get('/', donadorController.getAll);
router.get('/:id', donadorController.getById);
router.post('/', donadorController.add);
router.delete('/:id', donadorController.eliminar);
router.put('/:id', donadorController.editar);

module.exports = router;
