"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRequestController = editRequestController;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const editRequestUseCase_1 = require("../../useCases/request/editRequestUseCase");
const editRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    ispId: zod_1.z.string().uuid(),
    status: zod_1.z.nativeEnum(client_1.RequestStatus).optional(),
    respondedById: zod_1.z.string().uuid().nullable().optional(),
});
async function editRequestController(req, res, next) {
    try {
        const params = editRequestSchema.safeParse({
            id: req.params.id,
            ispId: req.params.ispId,
            ...req.body,
        });
        if (!params.success) {
            throw new Error("Invalid request parameters");
        }
        // Get the employee ID from the authenticated user (assuming it's in req.user)
        const employeeId = req.user?.id;
        const request = await (0, editRequestUseCase_1.editRequestUseCase)({
            ...params.data,
            employeeId,
        });
        return res.status(200).json({
            status: "ok",
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
}
