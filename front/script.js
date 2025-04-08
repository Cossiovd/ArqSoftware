// URL base del API Gateway
const API_BASE_URL = 'http://localhost:3000';
const morgan = require('morgan');
app.use(morgan('dev'));
// Función para iniciar sesión
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('tokenMessage').textContent = '✅ Login exitoso';
      } else {
        document.getElementById('tokenMessage').textContent = `❌ ${data.message || 'Error al iniciar sesión'}`;
      }
    } catch (error) {
      document.getElementById('tokenMessage').textContent = '❌ Error en la solicitud';
    }
  }
  
// Función para obtener vuelos
async function getFlights() {
    try {
        const response = await fetch(`${API_BASE_URL}/vuelos`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (response.ok) {
            const flightsList = document.getElementById('flightsList');
            flightsList.innerHTML = '';
            data.forEach(flight => {
                const li = document.createElement('li');
                li.innerText = `Origen: ${flight.origen}, Destino: ${flight.destino}, Fecha: ${flight.fecha}`; // Corregir campos
                flightsList.appendChild(li);
            });
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al obtener vuelos:', error);
    }
}

// Función para reservar un vuelo
async function reserveFlight() {
    const flightId = document.getElementById('flightId').value;
    try {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ flightId })
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('reservationMessage').innerText = 'Reserva realizada con éxito';
        } else {
            document.getElementById('reservationMessage').innerText = data.message;
        }
    } catch (error) {
        console.error('Error al reservar vuelo:', error);
    }
}

// Función para obtener reservas
async function getReservations() {
    try {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (response.ok) {
            const reservationsList = document.getElementById('reservationsList');
            reservationsList.innerHTML = '';
            data.forEach(reservation => {
                const li = document.createElement('li');
                li.innerText = `Vuelo ID: ${reservation.vueloId}, Fecha: ${reservation.fecha}`; // Corregir campos
                reservationsList.appendChild(li);
            });
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al obtener reservas:', error);
    }
}