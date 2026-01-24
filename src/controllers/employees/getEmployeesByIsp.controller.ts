import type { NextFunction, Request, Response } from "express";
import { getEmployeesByIspUseCase } from "../../useCases/employees/getEmployeesByIsp";

export async function getEmployeesByIspController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { ispId } = req.params;

    if (!ispId) {
      throw new Error("ispId is required");
    }

    const employees = await getEmployeesByIspUseCase(ispId);

    return res.status(200).json({
      status: "ok",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
}
