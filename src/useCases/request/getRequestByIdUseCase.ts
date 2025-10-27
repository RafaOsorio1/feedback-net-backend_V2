import { databaseManager } from "../../libs/databaseManager";

export async function getRequestByIdUseCase(id: string, ispId: string) {
  const request = await databaseManager.getDatabase().request.findUnique({
    where: {
      id,
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
      analyticMetrics: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  return request;
}
