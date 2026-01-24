"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = initRestRoutes;
const index_1 = __importDefault(require("../controllers/Authentication/index"));
const ISPs_1 = __importDefault(require("../controllers/ISPs"));
const index_2 = __importDefault(require("../controllers/request/index"));
const index_3 = __importDefault(require("../controllers/response/index"));
function registerApiRoutes(app, prefix = "") {
    app.use(`${prefix}/auth`, new index_1.default().router);
    app.use(`${prefix}/request`, new index_2.default().router);
    app.use(`${prefix}/response`, new index_3.default().router);
    app.use(`${prefix}/isp`, new ISPs_1.default().router);
    app.use(`${prefix}/auth/test`, (req, res) => {
        res.send({
            status: "ok",
            data: "test",
        });
    });
}
function initRestRoutes(app) {
    const prefix = "/api";
    app.route("/").all((req, res) => {
        res.send({ status: "OK", data: "API OK" });
    });
    registerApiRoutes(app, prefix);
}
