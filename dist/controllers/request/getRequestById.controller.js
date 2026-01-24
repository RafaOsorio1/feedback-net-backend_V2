"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestByIdController = getRequestByIdController;
const zod_1 = require("zod");
const getRequestByIdUseCase_1 = require("../../useCases/request/getRequestByIdUseCase");
const getRequestByIdSchema = zod_1.z.object({
    requestId: zod_1.z.string().min(1),
});
async function getRequestByIdController(req, res, next) {
    try {
        const params = getRequestByIdSchema.safeParse({
            requestId: req.params.requestId,
        });
        if (!params.success) {
            throw new Error("Invalid request parameters");
        }
        console.log("params.data.requestId", params.data.requestId);
        const request = await (0, getRequestByIdUseCase_1.getRequestByIdUseCase)(params.data.requestId);
        console.log(request);
        return res.status(200).json({
            status: "ok",
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
}
