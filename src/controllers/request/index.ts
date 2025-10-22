import { Router } from "express";
import { IRoutes } from "../../routes";
import { createRequestController } from "./createRequest.controller";

export default class RequestRoutes implements IRoutes {
  readonly name = "Request";
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/", createRequestController);
  }

  initChildRoutes(): void {}
}
