"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = createUserUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
const bcrypt = require("bcryptjs");
async function createUserUseCase(payload) {
    const database = databaseManager_1.databaseManager.getDatabase();
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
    const result = await database.iSP.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
            address: payload.address,
        },
    });
    return result;
}
