"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = signupController;
const zod_1 = require("zod");
const signup_useCase_1 = require("../../useCases/users/signup.useCase");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email("Formato de correo electrónico inválido"),
    password: zod_1.z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    name: zod_1.z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    address: zod_1.z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    phone: zod_1.z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
});
async function signupController(req, res, next) {
    try {
        const validationResult = signupSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0]?.message ||
                "Datos de registro inválidos");
        }
        const userData = validationResult.data;
        const result = await (0, signup_useCase_1.signupUserUseCase)(userData);
        res.status(201).json({
            status: "success",
            code: 201,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}
