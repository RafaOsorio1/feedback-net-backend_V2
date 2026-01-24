import { EmployeeStatus } from "@prisma/client";
import { databaseManager } from "../../libs/databaseManager";

export async function deleteEmployeeUseCase(id: string) {
  const db = databaseManager.getDatabase();

  const employee = await db.employee.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
      status: EmployeeStatus.INACTIVE,
    },
  });

  return employee;
}
