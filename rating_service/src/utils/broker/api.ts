import axios from "axios";
import { AuthorizeError, NotFoundError } from "../error";
import { User } from "../../dto/user";

const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:4001";
const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:4000";


export const ValidateUser = async (token: string) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/user`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new AuthorizeError("user not authorised");
    }

    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not authorised");
  }
};

export const GetBookDetails = async (bookId: number) => {
  try {
    const response = await axios.get(`${CATALOG_BASE_URL}/books/${bookId}`);
    return response.data;
  } catch {
    throw new NotFoundError("book not found");
  }
};