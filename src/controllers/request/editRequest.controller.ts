import { RequestStatus } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { editRequestUseCase } from "../../useCases/request/editRequestUseCase";

const editRequestSchema = z.object({
  id: z.string().uuid(),
  ispId: z.string().uuid(),
  status: z.nativeEnum(RequestStatus).optional(),
  respondedById: z.string().uuid().nullable().optional(),
});

export async function editRequestController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params = editRequestSchema.safeParse({
      id: req.params.id,
      ispId: req.params.ispId,
      ...req.body,
    });

    if (!params.success) {
      throw new Error("Invalid request parameters");
    }

    // Get the employee ID from the authenticated user (assuming it's in req.user)
    const employeeId = (req as any).user?.id;

    const request = await editRequestUseCase({
      ...params.data,
      employeeId,
    });

    return res.status(200).json({
      status: "ok",
      data: request,
    });
  } catch (error) {
    next(error);
  }
}
