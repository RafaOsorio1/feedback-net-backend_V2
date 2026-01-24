"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserUseCase = loginUserUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
const hash_1 = require("../../libs/hash");
const jwt_1 = require("../../libs/jwt");
async function loginUserUseCase(credentials) {
    const database = databaseManager_1.databaseManager.getDatabase();
    const ISP = await database.iSP.findUnique({
        where: {
            email: credentials.email,
        },
    });
    if (!ISP) {
        throw new Error("ISP not found");
    }
    const isPasswordValid = await (0, hash_1.comparePassword)(credentials.password, ISP.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const payload = {
        id: ISP.id,
        email: ISP.email,
        name: ISP.name,
    };
    const token = await (0, jwt_1.generateJWT)(payload);
    return {
        token,
        isp: {
            id: ISP.id,
            email: ISP.email,
            name: ISP.name,
            address: ISP.address || "",
            phone: ISP.phone || "",
        },
    };
}
