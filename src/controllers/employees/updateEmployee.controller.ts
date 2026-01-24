import { EmployeeRole, EmployeeStatus } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { updateEmployeeUseCase } from "../../useCases/employees/updateEmployee";

const updateEmployeeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(EmployeeRole).optional(),
  status: z.nativeEnum(EmployeeStatus).optional(),
});

export async function updateEmployeeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const validatedData = updateEmployeeSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new Error("Invalid update data");
    }

    const employee = await updateEmployeeUseCase(id, validatedData.data);

    return res.status(200).json({
      status: "ok",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
}
