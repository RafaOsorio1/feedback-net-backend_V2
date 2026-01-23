import { databaseManager } from "../../libs/databaseManager";

export async function getResponsesByRequestUseCase(requestId: string) {
  const db = databaseManager.getDatabase();
  const responses = await db.response.findMany({
    where: { requestId },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      isp: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return responses;
}
