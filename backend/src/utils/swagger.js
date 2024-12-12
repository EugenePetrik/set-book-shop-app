const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { join } = require('path');
const { version } = require('../../../package.json');

// Swagger options configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API docs',
      version,
      description: 'API documentation for the Bookstore application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [join(process.cwd(), 'src', 'routes', '*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Sets up Swagger documentation for the application.
 *
 * @param {object} app - The Express application instance.
 * @param {number} port - The port number the application is running on.
 */
const swaggerDocs = (app, port) => {
  // Serve Swagger UI at the /api-docs route
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve the Swagger spec in JSON format at the /api-docs.json route
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api-docs`.blue.bold);
};

module.exports = { swaggerDocs };
