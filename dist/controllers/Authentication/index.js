"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllIsps_controller_1 = require("../ISPs/getAllIsps.controller");
const login_controller_1 = require("./login.controller");
const signup_controller_1 = require("./signup.controller");
class UsersRoutes {
    constructor() {
        this.name = "Users";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", getAllIsps_controller_1.getAllISPsController);
        this.router.post("/login", login_controller_1.loginController);
        this.router.post("/signup", signup_controller_1.signupController);
    }
    initChildRoutes() { }
}
exports.default = UsersRoutes;
