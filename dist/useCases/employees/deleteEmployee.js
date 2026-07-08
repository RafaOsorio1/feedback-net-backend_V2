"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeUseCase = deleteEmployeeUseCase;
const client_1 = require("@prisma/client");
const databaseManager_1 = require("../../libs/databaseManager");
async function deleteEmployeeUseCase(id) {
    const db = databaseManager_1.databaseManager.getDatabase();
    const employee = await db.employee.update({
        where: {
            id,
        },
        data: {
            deletedAt: new Date(),
            status: client_1.EmployeeStatus.INACTIVE,
        },
    });
    return employee;
}
