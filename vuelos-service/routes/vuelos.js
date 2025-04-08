const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');
const { validateVuelo } = require('../controllers/vuelosController');

/**
 * @swagger
 * /vuelos:
 *   get:
 *     summary: Obtener todos los vuelos disponibles
 *     tags: [Vuelos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vuelos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   origen:
 *                     type: string
 *                   destino:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 */
router.get('/', vuelosController.getAllVuelos); 
router.post('/', validateVuelo, vuelosController.createVuelo);
router.get('/:id', vuelosController.getVueloById);

module.exports = router;
