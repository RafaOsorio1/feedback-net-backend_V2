import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { deleteRequestUseCase } from "../../useCases/request/deleteRequestUseCase";

const deleteRequestSchema = z.object({
  id: z.string().uuid(),
  ispId: z.string().uuid(),
});

export async function deleteRequestController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = deleteRequestSchema.safeParse({
      id: req.params.id,
      ispId: req.params.ispId,
    });

    if (!params.success) {
      throw new Error("Invalid request parameters");
    }

    const result = await deleteRequestUseCase(params.data.id, params.data.ispId);

    return res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
