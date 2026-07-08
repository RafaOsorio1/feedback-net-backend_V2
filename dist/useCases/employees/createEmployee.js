"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeUseCase = createEmployeeUseCase;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const databaseManager_1 = require("../../libs/databaseManager");
async function createEmployeeUseCase(payload) {
    const db = databaseManager_1.databaseManager.getDatabase();
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(payload.password, salt);
    const employee = await db.employee.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
            ispId: payload.ispId,
            status: client_1.EmployeeStatus.ACTIVE,
        },
    });
    return employee;
}
