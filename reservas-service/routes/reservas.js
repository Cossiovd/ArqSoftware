// Rutas para el microservicio de reservas
const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');
const { validateReserva } = require('../controllers/reservasController');

router.get('/', reservasController.getAllReservas);
router.post('/', validateReserva, reservasController.createReserva);

module.exports = router;