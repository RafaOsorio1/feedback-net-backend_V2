import { Router } from "express";
import { IRoutes } from "../../routes";
import { createEmployeeController } from "./createEmployee.controller";
import { deleteEmployeeController } from "./deleteEmployee.controller";
import { getEmployeesByIspController } from "./getEmployeesByIsp.controller";
import { updateEmployeeController } from "./updateEmployee.controller";

export default class EmployeesRoutes implements IRoutes {
  readonly name = "Employees";
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/:ispId", getEmployeesByIspController);
    this.router.post("/", createEmployeeController);
    this.router.patch("/:id", updateEmployeeController);
    this.router.delete("/:id", deleteEmployeeController);
  }

  initChildRoutes(): void {}
}
