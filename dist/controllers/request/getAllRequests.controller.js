"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequestsController = getAllRequestsController;
const zod_1 = require("zod");
const getAllRequestsUseCase_1 = require("../../useCases/request/getAllRequestsUseCase");
const getAllRequestsSchema = zod_1.z.object({
    ispId: zod_1.z.string().uuid(),
});
async function getAllRequestsController(req, res, next) {
    try {
        const params = getAllRequestsSchema.safeParse({
            ispId: req.params.ispId,
        });
        if (!params.success) {
            throw new Error("Invalid ISP ID");
        }
        const requests = await (0, getAllRequestsUseCase_1.getAllRequestsUseCase)(params.data.ispId);
        return res.status(200).json({
            status: "ok",
            data: requests,
        });
    }
    catch (error) {
        next(error);
    }
}
