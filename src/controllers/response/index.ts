import { Router } from "express";
import { IRoutes } from "../../routes";
import { createResponseController } from "./createResponse.controller";
import { getResponsesByRequestController } from "./getResponsesByRequest.controller";

export default class ResponseRoutes implements IRoutes {
  readonly name = "Response";
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    // Create a new response
    this.router.post("/", createResponseController);
    
    // Get all responses for a request
    this.router.get("/request/:requestId", getResponsesByRequestController);
  }

  initChildRoutes(): void {}
}
