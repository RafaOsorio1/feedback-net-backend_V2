import { Router } from "express";
import { IRoutes } from "../../routes";
import { getAllISPsController } from "../ISPs/getAllIsps.controller";

export default class ISPsRoutes implements IRoutes {
  readonly name = "ISPs";
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/", getAllISPsController);
  }

  initChildRoutes(): void {}
}
