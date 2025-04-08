const express = require('express');
const vuelosRoutes = require('./routes/vuelos.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const authMiddleware = require('./middleware/authMiddleware.js');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/vuelos', authMiddleware.authenticateToken, vuelosRoutes); 


// Configuración Swagger solo para este microservicio
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vuelos Service - VuelaMás',
      version: '1.0.0',
      description: 'Documentación del microservicio de Vuelos',
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
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ Vuelos service y Swagger UI corriendo en http://localhost:${PORT}`);
});
