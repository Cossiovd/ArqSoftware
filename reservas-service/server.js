const express = require('express');
const reservasRoutes = require('./routes/reservas');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const authMiddleware = require('./middleware/authMiddleware.js');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/reservas', authMiddleware.authenticateToken, reservasRoutes);

// Configuración Swagger solo para este microservicio
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reservas Service - VuelaMás',
      version: '1.0.0',
      description: 'Documentación del microservicio de reservas',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [ // 👈 ESTO lo hace obligatorio globalmente
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
});

// Swagger UI local
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Reservas service y Swagger UI corriendo en http://localhost:${PORT}`);
});
