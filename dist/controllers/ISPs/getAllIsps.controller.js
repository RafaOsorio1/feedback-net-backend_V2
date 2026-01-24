"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllISPsController = getAllISPsController;
const getAllIspsUseCase_1 = require("../../useCases/isp/getAllIspsUseCase");
async function getAllISPsController(req, res, next) {
    try {
        const ISPs = await (0, getAllIspsUseCase_1.getAllISPsUseCase)();
        return res.status(200).json({
            status: "ok",
            data: ISPs,
        });
    }
    catch (error) {
        next(error);
    }
}
