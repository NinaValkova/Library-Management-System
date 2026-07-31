import axios from "axios";
import { User } from "../middleware/authorizer";
import { APP_AUTH_SERVICE_BASE_URL } from "../config";

const AUTH_SERVICE_BASE_URL = APP_AUTH_SERVICE_BASE_URL || "http://localhost:4000";


export const ValidateUser = async (token: string) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/user`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new Error("user not authorised");
    }

    return response.data as User;
  } catch (error) {
    throw new Error("user not authorised");
  }
};

