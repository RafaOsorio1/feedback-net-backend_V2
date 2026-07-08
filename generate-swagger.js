const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Feedback Net API',
    description: 'API for Feedback Net platform. Features real-time notifications, user management, and feedback analytics.'
  },
  host: 'feedback-net-backend-v2.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './src/swagger_output.json';
const routes = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, routes, doc);
