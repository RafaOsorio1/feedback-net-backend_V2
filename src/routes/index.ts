import type { Application } from "express";
import { Router } from "express";
import UsersRoutes from "../controllers/Authentication/index";
import ISPsRoutes from "../controllers/ISPs";
import RequestRoutes from "../controllers/request/index";

export interface IRoutes {
  readonly name: string;
  readonly router: Router;

  initRoutes(): void;
  initChildRoutes?(): void;
}

function registerApiRoutes(app: Application, prefix = ""): void {
  app.use(`${prefix}/auth`, new UsersRoutes().router);
  app.use(`${prefix}/request`, new RequestRoutes().router);
  app.use(`${prefix}/isp`, new ISPsRoutes().router);
  app.use(`${prefix}/auth/test`, (req, res) => {
    res.send({
      status: "ok",
      data: "test",
    });
  });
}

export function initRestRoutes(app: Application): void {
  const prefix = "/api";

  app.route("/").all((req, res) => {
    res.send({ status: "OK", data: "API OK" });
  });

  registerApiRoutes(app, prefix);
}
