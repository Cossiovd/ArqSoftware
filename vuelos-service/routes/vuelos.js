// Rutas para el microservicio de vuelos
const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');
const { validateVuelo } = require('../controllers/vuelosController');

router.get('/', vuelosController.getAllVuelos);
router.post('/', validateVuelo, vuelosController.createVuelo);

module.exports = router;