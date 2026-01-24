import { EmployeeRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createEmployeeUseCase } from "../../useCases/employees/createEmployee";

const createEmployeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(EmployeeRole),
  ispId: z.string(),
});

export async function createEmployeeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createEmployeeSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new Error("Invalid employee data");
    }

    const employee = await createEmployeeUseCase(validatedData.data);

    return res.status(201).json({
      status: "ok",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
}
