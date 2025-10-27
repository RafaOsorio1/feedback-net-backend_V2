import { Router } from "express";
import { IRoutes } from "../../routes";
import { createRequestController } from "./createRequest.controller";
import { getAllRequestsController } from "./getAllRequests.controller";
import { getRequestByIdController } from "./getRequestById.controller";
import { deleteRequestController } from "./deleteRequest.controller";

export default class RequestRoutes implements IRoutes {
  readonly name = "Request";
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    // Create a new request
    this.router.post("/", createRequestController);
    
    // Get all requests for an ISP
    this.router.get("/:ispId", getAllRequestsController);
    
    // Get a specific request by ID
    this.router.get("/:id/isp/:ispId", getRequestByIdController);
    
    // Delete a request (soft delete)
    this.router.delete("/:id/isp/:ispId", deleteRequestController);
    
    // Edit request is already handled in editRequest.controller.ts
  }

  initChildRoutes(): void {}
}
