import axios from "axios";

import {
  AUTH_SERVICE_BASE_URL,
} from "../config";

export interface AuthUser {
  id: number;

  username: string;

  role: string;
}

export const ValidateUser =
  async (
    authorization: string
  ): Promise<AuthUser> => {
    const response =
      await axios.get<AuthUser>(
        `${AUTH_SERVICE_BASE_URL}/auth/user`,
        {
          headers: {
            Authorization:
              authorization,
          },
        }
      );

    return response.data;
  };