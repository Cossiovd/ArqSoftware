// Rutas para el microservicio de autenticación
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
const users = require('../data/users.json');
router.get('/users', (req, res) => {
  const sanitizedUsers = users.map(u => ({ id: u.id, username: u.username }));
  res.json(sanitizedUsers);
});


module.exports = router;