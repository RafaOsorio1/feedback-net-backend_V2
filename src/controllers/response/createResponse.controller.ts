import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createResponseUseCase } from "../../useCases/response/createResponseUseCase";

const createResponseSchema = z.object({
  content: z.string(),
  requestId: z.string(),
  employeeId: z.string().optional(),
  ispId: z.string().optional(),
});

export async function createResponseController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody = createResponseSchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw new Error(parsedBody.error.message);
    }

    const { content, requestId, employeeId, ispId } = parsedBody.data;

    const response = await createResponseUseCase({
      content,
      requestId,
      employeeId,
      ispId,
    });

    return res.status(201).json({
      status: "ok",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
