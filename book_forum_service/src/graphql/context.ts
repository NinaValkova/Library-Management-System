import { Request } from "express";

import {
  AuthUser,
  ValidateUser,
} from "../connections/auth.connection";

export interface GraphQLContext {
  user: AuthUser | null;
}

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> => {
  const authorization =
    req.headers.authorization;

  if (!authorization) {
    return {
      user: null,
    };
  }

  try {
    const user =
      await ValidateUser(authorization);

    return {
      user,
    };
  } catch {
    return {
      user: null,
    };
  }
};