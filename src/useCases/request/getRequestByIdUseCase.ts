import { databaseManager } from "../../libs/databaseManager";

export async function getRequestByIdUseCase(id: string) {
  const request = await databaseManager.getDatabase().request.findFirst({
    where: {
      OR: [{ id }, { referenceNumber: id }],
      deletedAt: null,
    },
    include: {
      responses: {
        orderBy: {
          createdAt: "desc",
        },
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
              name: true,
              logo: true,
            },
          },
        },
      },
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

  console.log(request);

  return request;
}
