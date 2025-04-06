// URL base del API Gateway
const API_BASE_URL = 'http://localhost:3000';

// Función para iniciar sesión
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; // Agregar password
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) // Enviar username y password
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('tokenMessage').innerText = `Token: ${data.token}`;
            localStorage.setItem('token', data.token);
        } else {
            document.getElementById('tokenMessage').innerText = data.message;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
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