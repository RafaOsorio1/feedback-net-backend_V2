import { ISP } from "@prisma/client";
import { databaseManager } from "../../libs/databaseManager";
const bcrypt = require("bcryptjs");

export async function createUserUseCase(payload: ISP) {
  const database = databaseManager.getDatabase();
  const salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, salt);

  const result = await database.iSP.create({
    data: {
      name: payload.name as string,
      email: payload.email as string,
      password: payload.password as string,
      phone: payload.phone as string,
      address: payload.address as string,
    },
  });

  return result;
}
