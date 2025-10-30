import { RequestType } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { createRequestUseCase } from "src/useCases/request/createRequestUseCase";
import { z } from "zod";

const createRequestSchema = z.object({
  fullName: z.string(),
  ispId: z.string(),
  phone: z.string(),
  address: z.string(),
  email: z.string(),
  subject: z.string(),
  details: z.string(),
  type: z.nativeEnum(RequestType),
});

export type CreateRequestSchema = z.infer<typeof createRequestSchema>;

export async function createRequestController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = createRequestSchema.safeParse(req.body);

    if (!body.success) {
      console.log("error", JSON.stringify(body.error, null, 2));
      throw new Error("Invalid request data");
    }

    const request = await createRequestUseCase(body.data);

    return res.status(201).json({
      status: "ok",
      data: request,
    });
  } catch (error) {
    next(error);
  }
}
