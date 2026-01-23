import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getRequestByIdUseCase } from "../../useCases/request/getRequestByIdUseCase";

const getRequestByIdSchema = z.object({
  requestId: z.string().min(1),
});

export async function getRequestByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params = getRequestByIdSchema.safeParse({
      requestId: req.params.requestId,
    });

    if (!params.success) {
      throw new Error("Invalid request parameters");
    }

    console.log("params.data.requestId", params.data.requestId);

    const request = await getRequestByIdUseCase(params.data.requestId);

    console.log(request);

    return res.status(200).json({
      status: "ok",
      data: request,
    });
  } catch (error) {
    next(error);
  }
}
