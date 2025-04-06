// Punto de entrada para el microservicio de reservas
const express = require('express');
const { authenticateToken } = require('../auth-service/middleware/authMiddleware');
const reservasRoutes = require('./routes/reservas');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // Asegúrate de que coincida con el auth-service

// Aplicar el middleware a todas las rutas
app.use(authenticateToken);

app.use('/reservas', reservasRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Reservas service running on port ${PORT}`);
});