"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUserUseCase = signupUserUseCase;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const databaseManager_1 = require("../../libs/databaseManager");
const jwt_1 = require("../../libs/jwt");
async function signupUserUseCase(credentials) {
    const database = databaseManager_1.databaseManager.getDatabase();
    const existingUser = await database.iSP.findUnique({
        where: {
            email: credentials.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(credentials.password, salt);
    const user = await database.iSP.create({
        data: {
            email: credentials.email,
            password: hashedPassword,
            name: credentials.name,
            address: credentials.address,
            phone: credentials.phone,
        },
    });
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    const token = await (0, jwt_1.generateJWT)(payload);
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            address: user.address || "",
            phone: user.phone || "",
        },
    };
}
