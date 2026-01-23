import { CreateRequestSchema } from "../../controllers/request/createRequest.controller";
import { databaseManager } from "../../libs/databaseManager";
import { generateReferenceNumber } from "../../utils/referenceGenerator";

export async function createRequestUseCase(requestData: CreateRequestSchema) {
  const db = databaseManager.getDatabase();
  const now = new Date();
  const period = new Date(now.getFullYear(), now.getMonth(), 1); // Group by month

  const [request, _] = await db.$transaction([
    db.request.create({
      data: {
        fullName: requestData.fullName,
        ispId: requestData.ispId,
        phone: requestData.phone,
        address: requestData.address,
        email: requestData.email,
        subject: requestData.subject,
        details: requestData.details,
        type: requestData.type,
        referenceNumber: generateReferenceNumber(),
      },
    }),
    db.analyticMetric.upsert({
      where: {
        period_type_ispId: {
          period,
          type: requestData.type,
          ispId: requestData.ispId,
        },
      },
      create: {
        period,
        type: requestData.type,
        status: "PENDING",
        totalRequests: 1,
        pendingCount: 1,
        isp: { connect: { id: requestData.ispId } },
      },
      update: {
        totalRequests: { increment: 1 },
        pendingCount: { increment: 1 },
        updatedAt: now,
      },
    }),
  ]);

  // get request by id
  const result = await db.request.findUnique({
    where: {
      id: request.id,
    },
    include: {
      responses: {
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

  return result;
}
