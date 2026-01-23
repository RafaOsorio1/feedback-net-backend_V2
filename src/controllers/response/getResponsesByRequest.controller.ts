import { NextFunction, Request, Response } from "express";
import { getResponsesByRequestUseCase } from "src/useCases/response/getResponsesByRequestUseCase";
import { z } from "zod";

export async function getResponsesByRequestController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedParams = z
      .object({
        requestId: z.string(),
      })
      .safeParse(req.params);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const { requestId } = parsedParams.data;
    const responses = await getResponsesByRequestUseCase(requestId);
    return res.status(200).json({
      status: "success",
      data: responses,
    });
  } catch (error: any) {
    next(error);
  }
}
