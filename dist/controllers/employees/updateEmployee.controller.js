"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeController = updateEmployeeController;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const updateEmployee_1 = require("../../useCases/employees/updateEmployee");
const updateEmployeeSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    role: zod_1.z.nativeEnum(client_1.EmployeeRole).optional(),
    status: zod_1.z.nativeEnum(client_1.EmployeeStatus).optional(),
});
async function updateEmployeeController(req, res, next) {
    try {
        const { id } = req.params;
        const validatedData = updateEmployeeSchema.safeParse(req.body);
        if (!validatedData.success) {
            throw new Error("Invalid update data");
        }
        const employee = await (0, updateEmployee_1.updateEmployeeUseCase)(id, validatedData.data);
        return res.status(200).json({
            status: "ok",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
}
