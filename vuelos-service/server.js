// Punto de entrada para el microservicio de vuelos
const express = require('express');
const { authenticateToken } = require('../auth-service/middleware/authMiddleware');
const vuelosRoutes = require('./routes/vuelos');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // Asegúrate de que coincida con el auth-service

// Aplicar el middleware a todas las rutas
app.use(authenticateToken);

app.use('/vuelos', vuelosRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Vuelos service running on port ${PORT}`);
});