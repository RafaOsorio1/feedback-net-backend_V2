import { EmployeeRole, EmployeeStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { databaseManager } from "../../libs/databaseManager";

export async function updateEmployeeUseCase(
  id: string,
  payload: {
    name?: string;
    email?: string;
    password?: string;
    role?: EmployeeRole;
    status?: EmployeeStatus;
  },
) {
  const db = databaseManager.getDatabase();

  const data: any = {
    name: payload.name,
    email: payload.email,
    role: payload.role,
    status: payload.status,
  };

  if (payload.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(payload.password, salt);
  }

  const employee = await db.employee.update({
    where: {
      id,
    },
    data,
  });

  return employee;
}
