# 🧭 Proyecto: Plataforma de Microservicios `VuelaMás`

Este proyecto implementa una arquitectura basada en microservicios para una agencia de viajes. Incluye:

- ✅ Servicio de autenticación (`auth-service`)
- ✈️ Servicio de vuelos (`vuelos-service`)
- 📄 Servicio de reservas (`reservas-service`)
- 📚 Documentación Swagger para cada servicio
- 🧵 Uso de `concurrently` para levantar todo con un solo comando

## 📦 Instalación
📌 `concurrently`, instálalo global o localmente:

```bash
npm install concurrently --save-dev
```

## ▶️ Ejecutar todos los servicios

Desde la raíz del proyecto, con el siguiente comando:

```bash
npm start
```

Este comando usa `concurrently` para levantar los servicios:

```json
"scripts": {
  "start": "concurrently \"npm run dev --prefix auth-service\" \"npm run dev --prefix vuelos-service\" \"npm run dev --prefix reservas-service\" \"npm run dev --prefix api-gateway-back\""
}
```

Cada servicio corre en su propio puerto:
- Auth: `3001`
- Vuelos: `3003`
- Reservas: `3002`

## 🔐 Pruebas con curl o Postman

### 1. Login (obtener token)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"password1"}'
```

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
### 4. ver reservca creada (con token)
```bash
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"password1"}'
```
