import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getRequestByIdUseCase } from "../../useCases/request/getRequestByIdUseCase";

const getRequestByIdSchema = z.object({
  id: z.string().uuid(),
  ispId: z.string().uuid(),
});

export async function getRequestByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = getRequestByIdSchema.safeParse({
      id: req.params.id,
      ispId: req.params.ispId,
    });

    if (!params.success) {
      throw new Error("Invalid request parameters");
    }

    const request = await getRequestByIdUseCase(params.data.id, params.data.ispId);

    return res.status(200).json({
      status: "ok",
      data: request,
    });
  } catch (error) {
    next(error);
  }
}
