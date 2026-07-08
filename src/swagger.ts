import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger_output.json");

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerDocument, {
  customSiteTitle: "Feedback Net API Documentation",
});
