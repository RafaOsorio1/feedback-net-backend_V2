"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createRequest_controller_1 = require("./createRequest.controller");
const deleteRequest_controller_1 = require("./deleteRequest.controller");
const getAllRequests_controller_1 = require("./getAllRequests.controller");
const getRequestById_controller_1 = require("./getRequestById.controller");
class RequestRoutes {
    constructor() {
        this.name = "Request";
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        // Create a new request
        this.router.post("/", createRequest_controller_1.createRequestController);
        // Get all requests for an ISP
        this.router.get("/:ispId", getAllRequests_controller_1.getAllRequestsController);
        // Get a specific request by ID
        this.router.get("/get-one/:requestId", getRequestById_controller_1.getRequestByIdController);
        // Delete a request (soft delete)
        this.router.delete("/:id", deleteRequest_controller_1.deleteRequestController);
        // Edit request is already handled in editRequest.controller.ts
    }
    initChildRoutes() { }
}
exports.default = RequestRoutes;
