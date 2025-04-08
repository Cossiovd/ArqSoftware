# ✈️ VuelaMás - Microservicios para una Agencia de Viajes

VuelaMás es una aplicación web desarrollada con una arquitectura basada en **microservicios**, que permite a los usuarios **registrarse, iniciar sesión, consultar vuelos disponibles, reservar vuelos y ver sus reservas**. Todo esto está documentado con Swagger y protegido mediante JWT.

---

## 💡 Tecnologías usadas

- **Node.js + Express** para servicios backend
- **Swagger** para documentación interactiva de APIs
- **JWT** para autenticación de usuarios
- **Fetch API** para consumo de APIs desde frontend
- **HTML + JS vanilla** para la interfaz de usuario
- **Nodemon** y **Concurrently** para desarrollo multiserver

---

## 🌐 Microservicios y Puertos

Cada servicio corre en su propio puerto y cumple una función específica:

 `auth-service` (Puerto `3001`)
  - Registro e inicio de sesión
  - Generación de tokens JWT
  - Endpoint `GET /auth/users` para enriquecer reservas

- `vuelos-service` (Puerto `3003`)
  - Consultar vuelos (`GET /vuelos`)
  - Crear vuelos (`POST /vuelos`)

- `reservas-service` (Puerto `3002`)
  - Crear reservas (`POST /reservas`)
  - Ver reservas (`GET /reservas`)
  - Enriquecimiento con username y detalles del vuelo

- `api-gateway` (Puerto `3000`)
  - Proxy central `/auth`, `/reservas`, `/vuelos`
  - Swagger unificado: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🔧 Instalación y ejecución

```bash
# 1. Clona el proyecto
git clone https://github.com/Cossiovd/ArqSoftware.git
cd ArqSoftware

# 2. Instala dependencias globales y locales
npm install
npm install --prefix auth-service
npm install --prefix vuelos-service
npm install --prefix reservas-service
npm install --prefix api-gateway

# 3. Ejecuta todos los servicios
npm start
```

---

## 🔍 Swagger UI

Disponible en:

```
http://localhost:3000/api-docs
```

Incluye documentación interactiva para:

- Login y registro
- Consulta y creación de vuelos
- Reserva de vuelos

---

## 📈 Frontend

Abre en el navegador:

```
http://localhost:3000/
```
Permite:

- Login de usuarios (`user1`, `user2`...)
- Consultar vuelos disponibles
- Reservar vuelos
- Ver solo las reservas propias enriquecidas con nombre de usuario y detalles del vuelo

---

## 📁 Datos por defecto

### Usuarios (`auth-service/data/users.json`):

```json
[
  { "id": 1, "username": "user1", "password": "password1" },
  { "id": 2, "username": "user2", "password": "password2" }
]
```

### Vuelos (`vuelos-service/data/vuelos.json`):

```json
[
  { "id": 101, "origen": "Ciudad A", "destino": "Ciudad B", "fecha": "2025-04-06" },
  { "id": 102, "origen": "Ciudad C", "destino": "Ciudad D", "fecha": "2025-04-07" }
]
```
---
## 🔐 Pruebas con Postman o Swagger UI

Puedes realizar pruebas desde:

- **Postman**
- **Swagger UI global:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Swagger UI por microservicio:**
  - Auth: [http://localhost:3001](http://localhost:3001)
  - Reservas: [http://localhost:3002](http://localhost:3002)
  - Vuelos: [http://localhost:3003](http://localhost:3003)

### 2. Consultar vuelos (con token)

```bash
curl -X GET http://localhost:3000/vuelos \
  -H "Authorization: Bearer TU_TOKEN"
```

### 3. Crear reserva (con token)

```bash
curl -X POST http://localhost:3000/reservas \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "fecha": "2024-04-06",
    "vueloId": 1
  }'
```

### 4. Ver reservas creadas (con token)

```bash
curl -X GET http://localhost:3000/reservas \
  -H "Authorization: Bearer TU_TOKEN"
```

---


## 🚫 Seguridad

- Todas las rutas (excepto `/auth`) están protegidas con JWT.
- Swagger incluye esquema de autenticación Bearer.
- El frontend almacena el token en `localStorage`.

---

## ✅ Estado Final

- [x] Microservicios funcionando
- [x] Proxy con API Gateway
- [x] Swagger integrado por servicio y global
- [x] Reservas enriquecidas con vuelo y username
- [x] Interfaz web funcional y conectada
- [x] Autenticación completa con JWT

---

## 🚧 Por mejorar

- Implementar base de datos real
- Mejorar estilo visual del frontend
- Agregar logout y registro desde la interfaz
- Control de errores más detallado por servicio

