"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeUseCase = updateEmployeeUseCase;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const databaseManager_1 = require("../../libs/databaseManager");
async function updateEmployeeUseCase(id, payload) {
    const db = databaseManager_1.databaseManager.getDatabase();
    const data = {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        status: payload.status,
    };
    if (payload.password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        data.password = await bcryptjs_1.default.hash(payload.password, salt);
    }
    const employee = await db.employee.update({
        where: {
            id,
        },
        data,
    });
    return employee;
}
