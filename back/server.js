const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = "secreto123"; // Se recomienda usar variables de entorno

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

// Datos simulados
let flights = [
    { id: 1, destination: "Madrid", price: 500 },
    { id: 2, destination: "Londres", price: 600 },
    { id: 3, destination: "París", price: 550 }
];

let reservations = [];

// Middleware de autenticación
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token requerido" });

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido" });
        req.user = decoded;
        next();
    });
};

// 🔑 Login (devuelve un token)
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Usuario requerido" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// ✈️ Ver vuelos disponibles
app.get('/flights', verifyToken, (req, res) => {
    res.json(flights);
});

// 🛒 Reservar un vuelo
app.post('/reserve', verifyToken, (req, res) => {
    const { flightId } = req.body;
    const flight = flights.find(f => f.id === flightId);

    if (!flight) return res.status(404).json({ message: "Vuelo no encontrado" });

    reservations.push({ username: req.user.username, flight });
    res.json({ message: "Reserva realizada con éxito", flight });
});

// 📋 Consultar reservas del usuario
app.get('/reservations', verifyToken, (req, res) => {
    const userReservations = reservations.filter(r => r.username === req.user.username);
    res.json(userReservations);
});

// 📍 Recomendaciones personalizadas
app.get('/recommendations', verifyToken, (req, res) => {
    const recommended = flights.sort((a, b) => a.price - b.price).slice(0, 2);
    res.json(recommended);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
