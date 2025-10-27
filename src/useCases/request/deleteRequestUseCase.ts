import { databaseManager } from "../../libs/databaseManager";

export async function deleteRequestUseCase(id: string, ispId: string) {
  const request = await databaseManager.getDatabase().request.update({
    where: {
      id,
      ispId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (!request) {
    throw new Error("Request not found or already deleted");
  }

  return { message: "Request deleted successfully" };
}
