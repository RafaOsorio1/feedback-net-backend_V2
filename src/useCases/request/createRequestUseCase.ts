import { CreateRequestSchema } from "src/controllers/request/createRequest.controller";
import { databaseManager } from "../../libs/databaseManager";

export async function createRequestUseCase(requestData: CreateRequestSchema) {
  const db = databaseManager.getDatabase();

  const request = await db.request.create({
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
9;
