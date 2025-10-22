import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  SignupCredentials,
  signupUserUseCase,
} from "../../useCases/users/signup.useCase";

const signupSchema = z.object({
  email: z.string().email("Formato de correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
});

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      throw new Error(
        validationResult.error.errors[0]?.message ||
          "Datos de registro inválidos",
      );
    }

    const userData: SignupCredentials = validationResult.data;
    const result = await signupUserUseCase(userData);

    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
