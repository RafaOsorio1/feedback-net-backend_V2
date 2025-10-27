import { databaseManager } from "../../libs/databaseManager";

export async function getAllRequestsUseCase(ispId: string) {
  const requests = await databaseManager.getDatabase().request.findMany({
    where: {
      ispId,
      deletedAt: null,
    },
    include: {
      isp: {
        select: {
          name: true,
          logo: true,
        },
      },
      respondedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return requests;
}
