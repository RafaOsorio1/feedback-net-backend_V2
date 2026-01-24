"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseController = createResponseController;
const zod_1 = require("zod");
const createResponseUseCase_1 = require("../../useCases/response/createResponseUseCase");
const createResponseSchema = zod_1.z.object({
    content: zod_1.z.string(),
    requestId: zod_1.z.string(),
    employeeId: zod_1.z.string().optional(),
    ispId: zod_1.z.string().optional(),
});
async function createResponseController(req, res, next) {
    try {
        const parsedBody = createResponseSchema.safeParse(req.body);
        if (!parsedBody.success) {
            throw new Error(parsedBody.error.message);
        }
        const { content, requestId, employeeId, ispId } = parsedBody.data;
        const response = await (0, createResponseUseCase_1.createResponseUseCase)({
            content,
            requestId,
            employeeId,
            ispId,
        });
        return res.status(201).json({
            status: "ok",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
}
