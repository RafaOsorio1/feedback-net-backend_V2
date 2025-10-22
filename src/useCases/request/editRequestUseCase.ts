import { Request } from "@prisma/client";
import { databaseManager } from "../../libs/databaseManager";

export async function editRequestUseCase(requestData: Request) {
  const db = databaseManager.getDatabase();

  const request = await db.request.update({
    where: {
      id: requestData.id,
    },
    data: {
      fullName: requestData.fullName,
      ispId: requestData.ispId,
      phone: requestData.phone,
      address: requestData.address,
      email: requestData.email,
      subject: requestData.subject,
      details: requestData.details,
      type: requestData.type,
    },
  });

  return request;
}
