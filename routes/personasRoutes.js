// personasRoutes.js
const express = require('express');
const router = express.Router();
const personaController = require('../controladores/personaController');

router.get('/', personaController.getAll);
router.get('/:rfc', personaController.getByRFC);
router.post('/', personaController.add);
router.delete('/:id', personaController.eliminar);
router.put('/:id', personaController.editar);

module.exports = router;
