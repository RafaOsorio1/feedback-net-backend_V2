"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestController = createRequestController;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createRequestUseCase_1 = require("../../useCases/request/createRequestUseCase");
const createRequestSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    ispId: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    email: zod_1.z.string(),
    subject: zod_1.z.string(),
    details: zod_1.z.string(),
    type: zod_1.z.nativeEnum(client_1.RequestType),
});
async function createRequestController(req, res, next) {
    try {
        const body = createRequestSchema.safeParse(req.body);
        if (!body.success) {
            console.log("error", JSON.stringify(body.error, null, 2));
            throw new Error("Invalid request data");
        }
        const request = await (0, createRequestUseCase_1.createRequestUseCase)(body.data);
        return res.status(201).json({
            status: "ok",
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
}
