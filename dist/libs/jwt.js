"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = generateJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(payload) {
    const SECRET_KEY = process.env.JWT_KEY || "default_secret_key_for_development";
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                reject(new Error(`Error to generate token: ${err.message}`));
            }
            else {
                resolve(token);
            }
        });
    });
}
function verifyJWT(token) {
    const SECRET_KEY = process.env.JWT_KEY || "default_secret_key_for_development";
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(new Error(`Error verifying token: ${err.message}`));
            }
            else {
                resolve(decoded);
            }
        });
    });
}
