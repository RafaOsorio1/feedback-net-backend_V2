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
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureCore();
    }
    configureCore() {
        this.app.use((0, cors_1.default)({
            origin: process.env.CLIENT_URL || "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use;
        this.app.use((req, res, next) => {
            logger_1.logger.info(`📥 ${req.method} ${req.url}`);
            next();
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
