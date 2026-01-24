"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsesByRequestController = getResponsesByRequestController;
const zod_1 = require("zod");
const getResponsesByRequestUseCase_1 = require("../../useCases/response/getResponsesByRequestUseCase");
async function getResponsesByRequestController(req, res, next) {
    try {
        const parsedParams = zod_1.z
            .object({
            requestId: zod_1.z.string(),
        })
            .safeParse(req.params);
        if (!parsedParams.success) {
            throw new Error(parsedParams.error.message);
        }
        const { requestId } = parsedParams.data;
        const responses = await (0, getResponsesByRequestUseCase_1.getResponsesByRequestUseCase)(requestId);
        return res.status(200).json({
            status: "success",
            data: responses,
        });
    }
    catch (error) {
        next(error);
    }
}
