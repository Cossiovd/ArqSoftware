const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

// Proxys hacia microservicios
app.use('/auth', proxy('http://localhost:3001', {
  proxyReqPathResolver: req => `/auth${req.url}`,
  proxyReqBodyDecorator: body => body,
}));

app.use('/reservas', proxy('http://localhost:3002', {
  proxyReqPathResolver: req => `/reservas${req.url}`,
  proxyReqBodyDecorator: body => body,
}));

app.use('/vuelos', proxy('http://localhost:3003', {
  proxyReqPathResolver: req => `/vuelos${req.url}`,
  proxyReqBodyDecorator: body => body,
}));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway - VuelaMás',
      version: '1.0.0',
      description: 'Documentación unificada de los servicios',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    '../auth-service/routes/*.js',
    '../vuelos-service/routes/*.js',
    '../reservas-service/routes/*.js'
  ]
});


// Swagger UI disponible en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Frontend disponible en /
app.use(express.static(path.join(__dirname, '../front')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada en el API Gateway' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway corriendo en http://localhost:${PORT}`);
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  console.log(`🌐 Frontend disponible en http://localhost:${PORT}/`);
});
