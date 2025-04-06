const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

// Controlador para el microservicio de reservas
exports.getAllReservas = (req, res) => {
  const reservasPath = path.join(__dirname, '../data/reservas.json');
  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));
  res.json(reservas);
};

exports.createReserva = (req, res) => {
  const { userId, vueloId, fecha } = req.body;

  if (!userId || !vueloId || !fecha) {
    return res.status(400).json({ message: 'Todos los campos (userId, vueloId, fecha) son requeridos' });
  }

  const reservasPath = path.join(__dirname, '../data/reservas.json');
  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));

  // Crear nueva reserva
  const newReserva = {
    id: reservas.length + 1,
    userId,
    vueloId,
    fecha
  };
  reservas.push(newReserva);

  // Guardar en el archivo reservas.json
  fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));

  res.status(201).json({ message: 'Reserva creada exitosamente', reserva: newReserva });
};

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