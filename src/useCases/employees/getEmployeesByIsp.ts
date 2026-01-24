import { databaseManager } from "../../libs/databaseManager";

export async function getEmployeesByIspUseCase(ispId: string) {
  const db = databaseManager.getDatabase();

  const employees = await db.employee.findMany({
    where: {
      ispId,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return employees;
}
