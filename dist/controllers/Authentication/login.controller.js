"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
const zod_1 = require("zod");
const login_useCase_1 = require("../../useCases/users/login.useCase");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
async function loginController(req, res, next) {
    try {
        console.log("request body", req.body);
        const validationResult = loginSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new Error(validationResult.error.message);
        }
        const credentials = validationResult.data;
        const loginResult = await (0, login_useCase_1.loginUserUseCase)(credentials);
        res
            .cookie("access_token", loginResult.token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        })
            .status(200)
            .json({
            status: "success",
            data: loginResult,
        });
    }
    catch (error) {
        next(error);
    }
}
