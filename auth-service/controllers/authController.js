const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

const SECRET_KEY = 'your_secret_key'; // Cambia esto por una clave secreta segura

// Controlador para el microservicio de autenticación
exports.validateLogin = [
  check('username').notEmpty().withMessage('El username es requerido'),
  check('password').notEmpty().withMessage('El password es requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateRegister = [
  check('username').notEmpty().withMessage('El username es requerido'),
  check('password').notEmpty().withMessage('El password es requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Simular validación de usuario
  const users = require('../data/users.json');
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Generar token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  // ✅ Enviar también los datos del usuario
  res.json({
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      username: user.username
    }
  });
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username y password son requeridos' });
  }

  const usersPath = path.join(__dirname, '../data/users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

  // Verificar si el usuario ya existe
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  // Crear nuevo usuario
  const newUser = {
    id: users.length + 1,
    username,
    password
  };
  users.push(newUser);

  // Guardar en el archivo users.json
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
};