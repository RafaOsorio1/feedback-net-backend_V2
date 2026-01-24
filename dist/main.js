"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app/app");
const server_1 = require("./app/server");
const databaseManager_1 = require("./libs/databaseManager");
async function main() {
    // 1. Conectar a la base de datos
    await databaseManager_1.databaseManager.connect();
    // 2. Inicializar aplicación
    const app = new app_1.Application();
    app.enableStatic(__dirname + "/public"); // Opcional: solo si necesitas archivos estáticos
    // 3. Crear servidor HTTP
    const server = new server_1.Server(app, Number(process.env.PORT) || 3111);
    // 4. Iniciar el servidor
    server.start();
    // Manejar cierre de la aplicación
    process.on("SIGINT", async () => {
        await databaseManager_1.databaseManager.disconnect();
        process.exit(0);
    });
    process.on("SIGTERM", async () => {
        await databaseManager_1.databaseManager.disconnect();
        process.exit(0);
    });
}
// Iniciar la aplicación
main().catch(console.error);
