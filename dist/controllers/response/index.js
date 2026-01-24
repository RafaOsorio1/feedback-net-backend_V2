"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createResponse_controller_1 = require("./createResponse.controller");
const getResponsesByRequest_controller_1 = require("./getResponsesByRequest.controller");
class ResponseRoutes {
    constructor() {
        this.name = "Response";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        // Create a new response
        this.router.post("/", createResponse_controller_1.createResponseController);
        // Get all responses for a request
        this.router.get("/request/:requestId", getResponsesByRequest_controller_1.getResponsesByRequestController);
    }
    initChildRoutes() { }
}
exports.default = ResponseRoutes;
