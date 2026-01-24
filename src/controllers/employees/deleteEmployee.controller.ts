import type { NextFunction, Request, Response } from "express";
import { deleteEmployeeUseCase } from "../../useCases/employees/deleteEmployee";

export async function deleteEmployeeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Employee ID is required");
    }

    const employee = await deleteEmployeeUseCase(id);

    return res.status(200).json({
      status: "ok",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
}
