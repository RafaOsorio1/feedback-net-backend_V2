"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeController = createEmployeeController;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createEmployee_1 = require("../../useCases/employees/createEmployee");
const createEmployeeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.nativeEnum(client_1.EmployeeRole),
    ispId: zod_1.z.string(),
});
async function createEmployeeController(req, res, next) {
    try {
        const validatedData = createEmployeeSchema.safeParse(req.body);
        if (!validatedData.success) {
            throw new Error("Invalid employee data");
        }
        const employee = await (0, createEmployee_1.createEmployeeUseCase)(validatedData.data);
        return res.status(201).json({
            status: "ok",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
}
