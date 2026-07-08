"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEmployee_controller_1 = require("./createEmployee.controller");
const deleteEmployee_controller_1 = require("./deleteEmployee.controller");
const getEmployeesByIsp_controller_1 = require("./getEmployeesByIsp.controller");
const updateEmployee_controller_1 = require("./updateEmployee.controller");
class EmployeesRoutes {
    constructor() {
        this.name = "Employees";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/:ispId", getEmployeesByIsp_controller_1.getEmployeesByIspController);
        this.router.post("/", createEmployee_controller_1.createEmployeeController);
        this.router.patch("/:id", updateEmployee_controller_1.updateEmployeeController);
        this.router.delete("/:id", deleteEmployee_controller_1.deleteEmployeeController);
    }
    initChildRoutes() { }
}
exports.default = EmployeesRoutes;
