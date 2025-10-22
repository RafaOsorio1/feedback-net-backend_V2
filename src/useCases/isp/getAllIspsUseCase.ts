import { databaseManager } from "../../libs/databaseManager";

export async function getAllISPsUseCase() {
  const db = databaseManager.getDatabase();

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
