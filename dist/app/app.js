"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("../middlewares/logger");
const routes_1 = require("../routes");
const swagger_1 = require("../swagger");
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureCore();
    }
    configureCore() {
        this.app.use((0, cors_1.default)({
            origin: process.env.CLIENT_URL || "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Serve Swagger Documentation
        this.app.use("/api-docs", swagger_1.swaggerServe, swagger_1.swaggerSetup);
        this.app.get("/", (req, res) => res.redirect("/api-docs"));
        this.app.use((req, res, next) => {
            logger_1.logger.info(`📥 ${req.method} ${req.baseUrl}${req.path}`);
            next();
            res.on("finish", () => {
                logger_1.logger.info(`📤 ${req.method} ${req.baseUrl}${req.path}`);
            });
            res.on("error", (error) => {
                logger_1.logger.error(`📤 ${req.method} ${req.baseUrl}${req.path}`, error);
            });
        });
    }
    initRestRoutes() {
        (0, routes_1.initRestRoutes)(this.app);
    }
    enableStatic(path) {
        this.app.use(express_1.default.static(path));
    }
}
exports.Application = Application;
