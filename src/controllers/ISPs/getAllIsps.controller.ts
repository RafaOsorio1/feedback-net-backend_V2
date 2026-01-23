import type { NextFunction, Request, Response } from "express";
import { getAllISPsUseCase } from "../../useCases/isp/getAllIspsUseCase";

export async function getAllISPsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ISPs = await getAllISPsUseCase();

    return res.status(200).json({
      status: "ok",
      data: ISPs,
    });
  } catch (error) {
    next(error);
  }
}
