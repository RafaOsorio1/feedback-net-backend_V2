import { databaseManager } from "../../libs/databaseManager";
import { comparePassword } from "../../libs/hash";
import { generateJWT, JwtPayload } from "../../libs/jwt";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  isp: {
    id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
  };
}

export async function loginUserUseCase(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const database = databaseManager.getDatabase();
  const ISP = await database.iSP.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!ISP) {
    throw new Error("ISP not found");
  }

  const isPasswordValid = await comparePassword(
    credentials.password,
    ISP.password,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload: JwtPayload = {
    id: ISP.id,
    email: ISP.email,
    name: ISP.name,
  };

  const token = await generateJWT(payload);

  return {
    token,
    isp: {
      id: ISP.id,
      email: ISP.email,
      name: ISP.name,
      address: ISP.address || "",
      phone: ISP.phone || "",
    },
  };
}
