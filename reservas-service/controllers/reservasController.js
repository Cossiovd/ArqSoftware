const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Ruta de archivo JSON
const reservasPath = path.join(__dirname, '../data/reservas.json');

exports.getAllReservas = async (req, res) => {
  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));

  try {
    const [vuelosRes, usersRes] = await Promise.all([
      axios.get('http://localhost:3003/vuelos', {
        headers: { Authorization: req.headers.authorization }
      }),
      axios.get('http://localhost:3001/auth/users', {
        headers: { Authorization: req.headers.authorization }
      })
    ]);

    const vuelos = vuelosRes.data;
    const usuarios = usersRes.data;

    const enriquecidas = reservas.map(r => {
      const vuelo = vuelos.find(v => v.id == r.vueloId);
      const usuario = usuarios.find(u => u.id == r.userId);

      return {
        ...r,
        username: usuario ? usuario.username : 'Desconocido',
        vuelo: vuelo || null
      };
    });

    res.json(enriquecidas);
  } catch (err) {
    res.status(500).json({ message: 'Error al enriquecer reservas', error: err.message });
  }
};

exports.createReserva = async (req, res) => {
  const { userId, vueloId, fecha } = req.body;

  if (!userId || !vueloId || !fecha) {
    return res.status(400).json({ message: 'Todos los campos (userId, vueloId, fecha) son requeridos' });
  }

  try {
    const response = await axios.get(`http://localhost:3003/vuelos/${vueloId}`, {
      headers: { Authorization: req.headers.authorization }
    });

    const vuelo = response.data;

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

  const reservas = JSON.parse(fs.readFileSync(reservasPath, 'utf-8'));
  const nueva = {
    id: reservas.length + 1,
    userId,
    vueloId,
    fecha
  };

  reservas.push(nueva);
  fs.writeFileSync(reservasPath, JSON.stringify(reservas, null, 2));
  res.status(201).json({ message: 'Reserva creada exitosamente', reserva: nueva });
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
