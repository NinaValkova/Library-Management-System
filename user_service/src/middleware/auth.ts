import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { tokenBlocklist } from "../db/schemas";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        jti: string;
        role: string;
      };
    }
  }
}

type AuthTokenPayload = jwt.JwtPayload & {
  id: number;
  username: string;
  jti: string;
  role: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      return res.status(403).json({ message: "Invalid token" });
    }

    const payload = decoded as AuthTokenPayload;

    const blocked = await DB.query.tokenBlocklist.findFirst({
      where: eq(tokenBlocklist.jti, payload.jti),
    });

    if (blocked) {
      return res.status(401).json({ message: "Token revoked" });
    }

    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};