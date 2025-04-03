1️⃣ Instalación de Node.js
Antes de comenzar, asegúrate de tener Node.js instalado en tu equipo. Puedes descargarlo desde nodejs.org.

2️⃣ Instalación de Dependencias
Abre una terminal en la carpeta donde guardarás el proyecto y ejecuta los siguientes comandos:

npm init -y
npm install express jsonwebtoken body-parser cors
Esto instalará las dependencias necesarias para la API.

3️⃣ Ejecutar la API REST
Para iniciar el servidor, ejecuta en la terminal:

node server.js
Si todo está bien, verás el siguiente mensaje en la terminal:


API corriendo en http://localhost:3000
4️⃣ Probar la API con Postman o cURL
Puedes probar los endpoints usando Postman o cURL en la terminal.

📌 Iniciar sesión para obtener el token

curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"usuario1"}'
📌 Guarda el token de la respuesta para las siguientes pruebas.

📌 Ver vuelos disponibles (requiere token)

curl -X GET http://localhost:3000/flights -H "Authorization: Bearer TU_TOKEN"
📌 Reservar un vuelo (ejemplo con ID = 1)

curl -X POST http://localhost:3000/reserve -H "Authorization: Bearer TU_TOKEN" -H "Content-Type: application/json" -d '{"flightId":1}'
5️⃣ Probar la Interfaz Web
📌 Abrir el archivo index.html en el navegador y probar las siguientes funcionalidades:

✅ Iniciar sesión con cualquier usuario.
✅ Ver los vuelos disponibles.
✅ Reservar un vuelo.
✅ Consultar las reservas realizadas.
✅ Ver recomendaciones personalizadas.
