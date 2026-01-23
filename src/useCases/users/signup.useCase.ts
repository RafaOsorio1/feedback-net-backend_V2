import bcrypt from "bcryptjs";
import { databaseManager } from "../../libs/databaseManager";
import { generateJWT, JwtPayload } from "../../libs/jwt";

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface SignupResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
  };
}

export async function signupUserUseCase(
  credentials: SignupCredentials,
): Promise<SignupResponse> {
  const database = databaseManager.getDatabase();

  const existingUser = await database.iSP.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(credentials.password, salt);

  const user = await database.iSP.create({
    data: {
      email: credentials.email,
      password: hashedPassword,
      name: credentials.name,
      address: credentials.address,
      phone: credentials.phone,
    },
  });

  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = await generateJWT(payload);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address || "",
      phone: user.phone || "",
    },
  };
}
