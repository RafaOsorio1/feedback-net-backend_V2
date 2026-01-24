import { EmployeeRole, EmployeeStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { databaseManager } from "../../libs/databaseManager";

export async function createEmployeeUseCase(payload: {
  name: string;
  role: EmployeeRole;
  email: string;
  password: string;
  ispId: string;
}) {
  const db = databaseManager.getDatabase();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);

  const employee = await db.employee.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role as EmployeeRole,
      ispId: payload.ispId,
      status: EmployeeStatus.ACTIVE,
    },
  });

  return employee;
}
