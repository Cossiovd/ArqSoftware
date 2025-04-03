1.	Se debe instalar Node.js, para luego seguir estos pasos
Instalar Express y JWT
Abre una terminal en la carpeta donde guardarás el proyecto y ejecuta:
npm init -y
npm install express jsonwebtoken body-parser cors

2.	Ejecutar la API REST
Inicia el servidor ejecutando en la terminal:
node server.js

Si todo está bien, verás este mensaje en la terminal:
API corriendo en http://localhost:3000

3.	Probar la API con Postman o cURL

Probar los endpoints usando Postman o cURL en la terminal.
•	iniciar sesión para obtener el token:
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"usuario1"}'
Guardar el token de la respuesta.
•	Ver vuelos disponibles (requiere token):
curl -X GET http://localhost:3000/flights -H "Authorization: Bearer TU_TOKEN"
•	Reservar un vuelo (ejemplo con ID = 1):
curl -X POST http://localhost:3000/reserve -H "Authorization: Bearer TU_TOKEN" -H "Content-Type: application/json" -d '{"flightId":1}'

4.	Probar la Interfaz Web
-	Abrir el archive index.html en el navegador
o	Ahora, prueba:
Iniciar sesión con cualquier usuario.
Ver los vuelos disponibles.
Reservar un vuelo.
Consultar las reservas realizadas.
Ver recomendaciones personalizadas.
