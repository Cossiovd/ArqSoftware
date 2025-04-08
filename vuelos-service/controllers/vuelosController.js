const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');
const vuelosPath = path.join(__dirname, '../data/vuelos.json');

// Controlador para el microservicio de vuelos
exports.getAllVuelos = (req, res) => {
  const vuelosPath = path.join(__dirname, '../data/vuelos.json');
  const vuelos = JSON.parse(fs.readFileSync(vuelosPath, 'utf-8'));
  res.json(vuelos);
};

exports.createVuelo = (req, res) => {
  const { origen, destino, fecha } = req.body;

  if (!origen || !destino || !fecha) {
    return res.status(400).json({ message: 'Todos los campos (origen, destino, fecha) son requeridos' });
  }

  const vuelosPath = path.join(__dirname, '../data/vuelos.json');
  const vuelos = JSON.parse(fs.readFileSync(vuelosPath, 'utf-8'));

  // Crear nuevo vuelo
  const newVuelo = {
    id: vuelos.length + 1,
    origen,
    destino,
    fecha
  };
  vuelos.push(newVuelo);

  // Guardar en el archivo vuelos.json
  fs.writeFileSync(vuelosPath, JSON.stringify(vuelos, null, 2));

  res.status(201).json({ message: 'Vuelo creado exitosamente', vuelo: newVuelo });
};

exports.validateVuelo = [
  check('origen').notEmpty().withMessage('El origen es requerido'),
  check('destino').notEmpty().withMessage('El destino es requerido'),
  check('fecha').notEmpty().withMessage('La fecha es requerida').isISO8601().withMessage('La fecha debe tener un formato válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
exports.getVueloById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vuelos = JSON.parse(fs.readFileSync(vuelosPath, 'utf-8'));
    const vuelo = vuelos.find(v => v.id === id);

    if (!vuelo) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    return res.status(200).json(vuelo);
  } catch (error) {
    console.error('❌ Error en getVueloById:', error.message);
    return res.status(500).json({ message: 'Error interno en vuelos', error: error.message });
  }
};