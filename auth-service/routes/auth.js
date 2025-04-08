// Rutas para el microservicio de autenticación
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../controllers/authController');

router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);

module.exports = router;