const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Ruta del archivo de reservas
const reservasPath = path.join(__dirname, '../data/reservas.json');

// Obtener todas las reservas
exports.getAllReservas = (req, res) => {
  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));
  res.json(reservas);
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  const { userId, vueloId, fecha } = req.body;

  // Validación básica de campos
  if (!userId || !vueloId || !fecha) {
    return res.status(400).json({ message: 'Todos los campos (userId, vueloId, fecha) son requeridos' });
  }

  let vuelo;

  try {
    const response = await axios.get(`http://localhost:3003/vuelos/${vueloId}`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    vuelo = response.data;

    if (vuelo.fecha !== fecha) {
      return res.status(400).json({ message: 'La fecha no coincide con la del vuelo' });
    }

  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(400).json({ message: 'El vuelo no existe' });
    }

    return res.status(500).json({
      message: 'Error al consultar el microservicio de vuelos',
      error: error.message
    });
  }

  // Cargar reservas existentes
  const reservasPath = path.join(__dirname, '../data/reservas.json');
  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));

  const newReserva = {
    id: reservas.length + 1,
    userId,
    vueloId,
    fecha,
    vuelo: {
      origen: vuelo.origen,
      destino: vuelo.destino,
      fecha: vuelo.fecha
    }
  };

  reservas.push(newReserva);
  fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));

  res.status(201).json({
    message: 'Reserva creada exitosamente',
    reserva: newReserva
  });
};

// Middleware de validación con express-validator
exports.validateReserva = [
  check('userId').notEmpty().withMessage('El userId es requerido'),
  check('vueloId').notEmpty().withMessage('El vueloId es requerido'),
  check('fecha').notEmpty().withMessage('La fecha es requerida').isISO8601().withMessage('La fecha debe tener un formato válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
