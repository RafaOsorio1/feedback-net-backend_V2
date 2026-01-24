"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequestController = deleteRequestController;
const zod_1 = require("zod");
const deleteRequestUseCase_1 = require("../../useCases/request/deleteRequestUseCase");
const deleteRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    ispId: zod_1.z.string().uuid(),
});
async function deleteRequestController(req, res, next) {
    try {
        const params = deleteRequestSchema.safeParse({
            id: req.params.id,
            ispId: req.params.ispId,
        });
        if (!params.success) {
            throw new Error("Invalid request parameters");
        }
        const result = await (0, deleteRequestUseCase_1.deleteRequestUseCase)(params.data.id, params.data.ispId);
        return res.status(200).json({
            status: "ok",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}
