"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsesByRequestUseCase = getResponsesByRequestUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function getResponsesByRequestUseCase(requestId) {
    const db = databaseManager_1.databaseManager.getDatabase();
    const responses = await db.response.findMany({
        where: { requestId },
        include: {
            employee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            isp: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return responses;
}
