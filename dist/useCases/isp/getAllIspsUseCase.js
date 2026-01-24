"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllISPsUseCase = getAllISPsUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function getAllISPsUseCase() {
    const db = databaseManager_1.databaseManager.getDatabase();
    const ISPs = await db.iSP.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    return ISPs;
}
