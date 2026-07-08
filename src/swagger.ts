import swaggerUi from "swagger-ui-express";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Feedback Net API",
    version: "1.0.0",
    description: "API for Feedback Net platform. Features real-time notifications, user management, and feedback analytics.",
    contact: {
      name: "Rafael Rodelo",
    },
  },
  servers: [
    {
      url: "/",
      description: "Current Server",
    },
  ],
  paths: {
    "/health": {
      get: {
        summary: "API Health Check",
        description: "Returns the health status of the API.",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "online" },
                    timestamp: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerDocument, {
  customSiteTitle: "Feedback Net API Documentation",
});
