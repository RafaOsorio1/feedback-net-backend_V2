"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllIsps_controller_1 = require("../ISPs/getAllIsps.controller");
class ISPsRoutes {
    constructor() {
        this.name = "ISPs";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", getAllIsps_controller_1.getAllISPsController);
    }
    initChildRoutes() { }
}
exports.default = ISPsRoutes;
