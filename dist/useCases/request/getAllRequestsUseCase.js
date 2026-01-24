"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequestsUseCase = getAllRequestsUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function getAllRequestsUseCase(ispId) {
    const requests = await databaseManager_1.databaseManager.getDatabase().request.findMany({
        where: {
            ispId,
            deletedAt: null,
        },
        include: {
            isp: {
                select: {
                    name: true,
                    logo: true,
                },
            },
            respondedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return requests;
}
