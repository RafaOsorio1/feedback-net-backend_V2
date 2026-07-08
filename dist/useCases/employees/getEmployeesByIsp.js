"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByIspUseCase = getEmployeesByIspUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function getEmployeesByIspUseCase(ispId) {
    const db = databaseManager_1.databaseManager.getDatabase();
    const employees = await db.employee.findMany({
        where: {
            ispId,
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
        },
    });
    return employees;
}
