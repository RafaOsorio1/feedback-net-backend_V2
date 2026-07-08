import type { Application } from "express";
import { Router } from "express";
import UsersRoutes from "../controllers/Authentication/index";
import EmployeesRoutes from "../controllers/employees/index";
import ISPsRoutes from "../controllers/ISPs";
import RequestRoutes from "../controllers/request/index";
import ResponseRoutes from "../controllers/response/index";

export interface IRoutes {
  readonly name: string;
  readonly router: Router;

  initRoutes(): void;
  initChildRoutes?(): void;
}

function registerApiRoutes(app: Application): void {
  app.use(`/api/auth`, new UsersRoutes().router);
  app.use(`/api/request`, new RequestRoutes().router);
  app.use(`/api/response`, new ResponseRoutes().router);
  app.use(`/api/isp`, new ISPsRoutes().router);
  app.use(`/api/employee`, new EmployeesRoutes().router);
  app.use(`/api/auth/test`, (req, res) => {
    res.send({
      status: "ok",
      data: "test",
    });
  });
}

export function initRestRoutes(app: Application): void {
  app.route("/").all((req, res) => {
    res.send({ status: "OK", data: "API OK" });
  });

  registerApiRoutes(app);
}
