"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeController = deleteEmployeeController;
const deleteEmployee_1 = require("../../useCases/employees/deleteEmployee");
async function deleteEmployeeController(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Employee ID is required");
        }
        const employee = await (0, deleteEmployee_1.deleteEmployeeUseCase)(id);
        return res.status(200).json({
            status: "ok",
            data: employee,
        });
    }
    catch (error) {
        next(error);
    }
}
