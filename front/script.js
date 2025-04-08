const BASE_URL = 'http://localhost:3000';

localStorage.clear();
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('getFlightsBtn').addEventListener('click', getFlights);
  document.getElementById('reserveBtn').addEventListener('click', reserveFlight);
  document.getElementById('getReservationsBtn').addEventListener('click', getReservations);
});

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userId', data.user.id);
      document.getElementById('tokenMessage').textContent = '✅ Login exitoso';
    } else {
      document.getElementById('tokenMessage').textContent = `❌ ${data.message}`;
    }
  } catch (error) {
    document.getElementById('tokenMessage').textContent = '❌ Error en la solicitud';
  }
}

async function getFlights() {
  const token = localStorage.getItem('token');
  if (!token) return alert('Inicia sesión primero');

  try {
    const res = await fetch(`${BASE_URL}/vuelos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const vuelos = await res.json();

    const list = document.getElementById('flightsList');
    list.innerHTML = '';
    vuelos.forEach(v => {
      const item = document.createElement('li');
      item.textContent = `ID: ${v.id}, Origen: ${v.origen}, Destino: ${v.destino}, Fecha: ${v.fecha}`;
      list.appendChild(item);
    });
  } catch (err) {
    alert('Error al obtener vuelos');
  }
}

async function reserveFlight() {
  const token = localStorage.getItem('token');
  if (!token) return alert('Inicia sesión primero');

  const vueloId = document.getElementById('flightId').value;
  const fecha = document.getElementById('flightDate').value;
  const userId = parseInt(localStorage.getItem('userId'));

  if (!vueloId || !fecha) return alert('Completa todos los campos');

  try {
    const res = await fetch(`${BASE_URL}/reservas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vueloId, fecha, userId })
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById('reservationMessage').textContent = '✅ Reserva creada';
    } else {
      document.getElementById('reservationMessage').textContent = `❌ ${data.message}`;
    }
  } catch (err) {
    document.getElementById('reservationMessage').textContent = '❌ Error al reservar';
  }
}

async function getReservations() {
  const token = localStorage.getItem('token');
  if (!token) return alert('Inicia sesión primero');

  try {
    const res = await fetch(`${BASE_URL}/reservas`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const reservas = await res.json();
    const currentUserId = parseInt(localStorage.getItem('userId'), 10);

    const list = document.getElementById('reservationsList');
    list.innerHTML = '';

    const misReservas = reservas.filter(r => r.userId === currentUserId);

    misReservas.forEach(r => {
      const vuelo = r.vuelo;
      const vueloInfo = vuelo
        ? `Vuelo ${r.vueloId}: ${vuelo.origen} ➡️ ${vuelo.destino}, Fecha del vuelo: ${vuelo.fecha}`
        : `Vuelo ${r.vueloId}`;

      const item = document.createElement('li');
      item.textContent = `🧾 Reserva ID: ${r.id} | Usuario: ${r.username} | ${vueloInfo} | Fecha reservada: ${r.fecha}`;
      list.appendChild(item);
    });
  } catch (err) {
    alert('Error al obtener reservas');
  }
}
