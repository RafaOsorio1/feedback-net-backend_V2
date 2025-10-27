import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getAllRequestsUseCase } from "../../useCases/request/getAllRequestsUseCase";

const getAllRequestsSchema = z.object({
  ispId: z.string().uuid(),
});

export async function getAllRequestsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params = getAllRequestsSchema.safeParse({
      ispId: req.params.ispId,
    });

    if (!params.success) {
      throw new Error("Invalid ISP ID");
    }

    const requests = await getAllRequestsUseCase(params.data.ispId);

    return res.status(200).json({
      status: "ok",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
}
