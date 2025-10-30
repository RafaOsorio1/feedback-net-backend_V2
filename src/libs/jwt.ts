import jwt from "jsonwebtoken";

// Definimos una interfaz para el payload del JWT
export interface JwtPayload {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

export function generateJWT(payload: JwtPayload): Promise<string> {
  const SECRET_KEY =
    process.env.JWT_KEY || "default_secret_key_for_development";

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject(new Error(`Error to generate token: ${err.message}`));
        } else {
          resolve(token as string);
        }
      },
    );
  });
}

export function verifyJWT(token: string): Promise<any> {
  const SECRET_KEY =
    process.env.JWT_KEY || "default_secret_key_for_development";

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(new Error(`Error verifying token: ${err.message}`));
      } else {
        resolve(decoded);
      }
    });
  });
}
