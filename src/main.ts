import dotenv from "dotenv";
dotenv.config();

import { Application } from "./app/app";
import { Server } from "./app/server";
import { databaseManager } from "./libs/databaseManager";

async function main() {
  // 1. Conectar a la base de datos
  await databaseManager.connect();

  // 2. Inicializar aplicación
  const app = new Application();
  app.enableStatic(__dirname + "/public"); // Opcional: solo si necesitas archivos estáticos

  // 3. Crear servidor HTTP
  const server = new Server(app, Number(process.env.PORT) || 3111);

  // 4. Iniciar el servidor
  server.start();

  // Manejar cierre de la aplicación
  process.on("SIGINT", async () => {
    await databaseManager.disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await databaseManager.disconnect();
    process.exit(0);
  });
}

// Iniciar la aplicación
main().catch(console.error);
