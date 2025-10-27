import { Prisma, RequestStatus, RequestType } from "@prisma/client";
import { databaseManager } from "../../libs/databaseManager";

interface UpdateRequestData {
  id: string;
  status?: RequestStatus;
  respondedById?: string | null;
  ispId: string;
  employeeId?: string;
}

export async function editRequestUseCase({
  id,
  status,
  respondedById,
  ispId,
  employeeId,
}: UpdateRequestData) {
  const db = databaseManager.getDatabase();
  const now = new Date();
  const period = new Date(now.getFullYear(), now.getMonth(), 1); // Group by month

  const [currentRequest, currentMetrics] = await Promise.all([
    db.request.findUnique({
      where: { id, ispId },
    }),
    db.analyticMetric.findFirst({
      where: {
        period,
        ispId,
        requestId: id,
      },
    }),
  ]);

  if (!currentRequest) {
    throw new Error("Request not found");
  }

  const updateData: Prisma.RequestUpdateInput = {};
  const metricUpdates: Prisma.AnalyticMetricUpdateInput = {
    updatedAt: now,
  };

  // Check if status is being updated
  if (status && status !== currentRequest.status) {
    updateData.status = status;
    updateData.updatedAt = now;

    if (status === "RESOLVED" || status === "CANCELED") {
      updateData.resolvedAt = now;
      // Calculate response time in hours
      const responseTimeHours =
        (now.getTime() - currentRequest.createdAt.getTime()) / (1000 * 60 * 60);
      metricUpdates.avgResponseTime = responseTimeHours;
    }

    // Update status-specific counters
    if (["RESOLVED", "CANCELED"].includes(status)) {
      metricUpdates.closedCount = { increment: 1 };
    } else if (status === "IN_PROGRESS") {
      metricUpdates.inProgressCount = { increment: 1 };
    } else if (status === "PENDING") {
      metricUpdates.pendingCount = { increment: 1 };
    }
  }

  // Check if responder is being updated
  if (
    respondedById !== undefined &&
    respondedById !== currentRequest.respondedById
  ) {
    updateData.respondedBy = respondedById
      ? { connect: { id: respondedById } }
      : { disconnect: true };

    if (respondedById) {
      metricUpdates.Employee = { connect: { id: respondedById } };
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("No valid fields to update");
  }

  const [updatedRequest] = await db.$transaction([
    db.request.update({
      where: { id, ispId },
      data: updateData,
      include: {
        respondedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    }),
    db.analyticMetric.upsert({
      where: {
        id: currentMetrics?.id || "new-metric",
      },
      create: {
        period,
        type: currentRequest.type as RequestType,
        status: status || currentRequest.status,
        totalRequests: 1,
        closedCount: status === "RESOLVED" || status === "CANCELED" ? 1 : 0,
        inProgressCount: status === "IN_PROGRESS" ? 1 : 0,
        pendingCount: status === "PENDING" ? 1 : 0,
        isp: { connect: { id: ispId } },
        ...(respondedById
          ? { employee: { connect: { id: respondedById } } }
          : {}),
      },
      update: {
        ...metricUpdates,
        totalRequests: { increment: 1 },
      },
    }),
  ]);

  return updatedRequest;
}
