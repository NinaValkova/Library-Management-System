import axios from "axios";
import { Book } from "../dto/request/book.dto";
import { APP_CATALOG_BASE_URL } from "../config";

const CATALOG_BASE_URL =
  APP_CATALOG_BASE_URL || "http://localhost:4001";

export const GetBookDetails = async (bookId: number) => {
  try {
    const response = await axios.get(
      `${CATALOG_BASE_URL}/books/${bookId}`
    );

    return response.data as Book;
  } catch (error) {
    throw new Error("book not found");
  }
};