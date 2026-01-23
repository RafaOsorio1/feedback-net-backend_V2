import { databaseManager } from "src/libs/databaseManager";

interface CreateResponseInput {
  content: string;
  requestId: string;
  employeeId?: string;
  ispId?: string;
}

export async function createResponseUseCase({
  content,
  requestId,
  employeeId,
  ispId,
}: CreateResponseInput) {
  const db = databaseManager.getDatabase();
  // Validate that at least one of employeeId or ispId is provided
  if (!employeeId && !ispId) {
    throw new Error("Either employeeId or ispId must be provided");
  }

  // Check if the request exists
  const request = await db.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  // If employeeId is provided, verify the employee exists
  if (employeeId) {
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }
  }

  // If ispId is provided, verify the ISP exists
  if (ispId) {
    const isp = await db.iSP.findUnique({
      where: { id: ispId },
    });

    if (!isp) {
      throw new Error("ISP not found");
    }
  }

  const response = await db.response.create({
    data: {
      content,
      request: {
        connect: { id: requestId },
      },
      ...(employeeId && {
        employee: {
          connect: { id: employeeId },
        },
      }),
      ...(ispId && {
        isp: {
          connect: { id: ispId },
        },
      }),
    },
    include: {
      employee: true,
      isp: true,
    },
  });

  if (request.status === "PENDING") {
    await db.request.update({
      where: { id: requestId },
      data: { status: "IN_PROGRESS" },
    });
  }

  return response;
}
