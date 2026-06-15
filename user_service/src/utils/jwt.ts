import jwt, { SignOptions } from "jsonwebtoken";
import { randomUUID } from "crypto";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET!;

const JWT_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1d";

export const generateToken = (payload: {
  id: number;
  username: string;
  role: string;
}) => {
  const jti = randomUUID();

  const token = jwt.sign(
    {
      ...payload,
      jti,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );

  return { token, jti };
};