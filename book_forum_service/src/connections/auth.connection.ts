import axios from "axios";

import { AUTH_SERVICE_BASE_URL } from "../config";

export interface AuthUser {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  email: string;
  role: string;
  birthNumber?: string | null;
  createdAt: string;
}

const BASE_URL =
  AUTH_SERVICE_BASE_URL || "http://localhost:4000";

export const ValidateUser = async (
  authorizationHeader: string
): Promise<AuthUser> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/user`,
      {
        headers: {
          Authorization: authorizationHeader,
        },
      }
    );

    return response.data as AuthUser;
  } catch {
    throw new Error("User not authorised");
  }
};