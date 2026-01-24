"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequestUseCase = deleteRequestUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function deleteRequestUseCase(id, ispId) {
    const request = await databaseManager_1.databaseManager.getDatabase().request.update({
        where: {
            id,
            ispId,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    });
    if (!request) {
        throw new Error("Request not found or already deleted");
    }
    return { message: "Request deleted successfully" };
}
