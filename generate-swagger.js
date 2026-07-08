const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Feedback Net API',
    description: 'API for Feedback Net platform. Features real-time notifications, user management, and feedback analytics.'
  },
  host: 'feedback-net-backend-v2.onrender.com',
  schemes: ['https', 'http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'auth-token',
      in: 'header',
      description: 'Ingrese su token JWT para autenticación'
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Iniciar sesión",
        parameters: [{
          in: "body",
          name: "body",
          description: "Credenciales de acceso",
          required: true,
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "usuario@ejemplo.com" },
              password: { type: "string", example: "123456" }
            }
          }
        }]
      }
    },
    "/api/auth/signup": {
      post: {
        summary: "Registrar ISP",
        parameters: [{
          in: "body",
          name: "body",
          description: "Datos de registro",
          required: true,
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "isp@empresa.com" },
              password: { type: "string", example: "123456" },
              name: { type: "string", example: "Mi Empresa ISP" },
              address: { type: "string", example: "Calle 123" },
              phone: { type: "string", example: "12345678" }
            }
          }
        }]
      }
    },
    "/api/request/": {
      post: {
        summary: "Crear solicitud / ticket",
        parameters: [{
          in: "body",
          name: "body",
          description: "Datos de la solicitud",
          required: true,
          schema: {
            type: "object",
            properties: {
              fullName: { type: "string", example: "Cliente Enojado" },
              ispId: { type: "string", example: "uuid-del-isp" },
              phone: { type: "string", example: "12345678" },
              address: { type: "string", example: "Su casa" },
              email: { type: "string", example: "cliente@correo.com" },
              subject: { type: "string", example: "Sin internet" },
              details: { type: "string", example: "El modem exploto" },
              type: { type: "string", example: "TECHNICAL_SUPPORT" }
            }
          }
        }]
      }
    },
    "/api/response/": {
      post: {
        summary: "Responder solicitud",
        parameters: [{
          in: "body",
          name: "body",
          description: "Datos de la respuesta",
          required: true,
          schema: {
            type: "object",
            properties: {
              content: { type: "string", example: "Estamos trabajando en ello" },
              requestId: { type: "string", example: "uuid-del-request" },
              employeeId: { type: "string", example: "uuid-del-empleado" },
              ispId: { type: "string", example: "uuid-del-isp" }
            }
          }
        }]
      }
    },
    "/api/employee/": {
      post: {
        summary: "Crear empleado",
        parameters: [{
          in: "body",
          name: "body",
          description: "Datos del empleado",
          required: true,
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "Juan Técnico" },
              email: { type: "string", example: "juan@empresa.com" },
              password: { type: "string", example: "123456" },
              role: { type: "string", example: "TECHNICIAN" },
              ispId: { type: "string", example: "uuid-del-isp" }
            }
          }
        }]
      }
    }
  }
};

const outputFile = './src/swagger_output.json';
const routes = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  const fs = require('fs');
  const data = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  for (const path in doc.paths) {
    if (data.paths[path]) {
      for (const method in doc.paths[path]) {
        if (data.paths[path][method]) {
          data.paths[path][method] = { ...data.paths[path][method], ...doc.paths[path][method] };
        }
      }
    }
  }
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
});
