const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const { validateReserva } = require('../controllers/reservasController');

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *               vueloId:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarioId:
 *                   type: string
 *                 vueloId:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validateReserva, reservasController.createReserva);
/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuarioId:
 *                     type: string
 *                   vueloId:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 */
router.get('/', reservasController.getAllReservas);



module.exports = router;
