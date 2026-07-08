"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = exports.swaggerServe = exports.swaggerDocument = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerDocument = {
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
exports.swaggerServe = swagger_ui_express_1.default.serve;
exports.swaggerSetup = swagger_ui_express_1.default.setup(exports.swaggerDocument, {
    customSiteTitle: "Feedback Net API Documentation",
});
