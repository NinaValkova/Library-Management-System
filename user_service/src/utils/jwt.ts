import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";


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
      algorithm: "HS256"
    }
  );

  return { token };
};