"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByIspController = getEmployeesByIspController;
const getEmployeesByIsp_1 = require("../../useCases/employees/getEmployeesByIsp");
async function getEmployeesByIspController(req, res, next) {
    try {
        const { ispId } = req.params;
        if (!ispId) {
            throw new Error("ispId is required");
        }
        const employees = await (0, getEmployeesByIsp_1.getEmployeesByIspUseCase)(ispId);
        return res.status(200).json({
            status: "ok",
            data: employees,
        });
    }
    catch (error) {
        next(error);
    }
}
