const express = require('express');
const authRoutes = require('./routes/auth');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', authRoutes);

// Configuración Swagger solo para este microservicio
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service - VuelaMás',
      version: '1.0.0',
      description: 'Documentación del microservicio de autenticación',
    },
  },
  apis: ['./routes/*.js'] // Importante: que tenga @swagger en tus rutas
});

// Swagger UI local
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Auth service and Swagger UI corriendo en http://localhost:${PORT}`);

});  
