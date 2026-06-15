import { CATALOG_SERVICE_URL } from "../constants/url";
import type { Book, BooksQueryParams, PaginatedBooks } from "../models/book";
import { apiRequest } from "../api/apiRequest";

function toQueryString(params: BooksQueryParams) {
  const searchParams = new URLSearchParams();

  if (params.pageIndex) searchParams.set("pageIndex", String(params.pageIndex));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.language) searchParams.set("language", params.language);
  if (params.isBorrowed) searchParams.set("isBorrowed", params.isBorrowed);
  if (params.sort) searchParams.set("sort", params.sort);

  return searchParams.toString();
}

const catalogService = {
  async getBooks(params: BooksQueryParams): Promise<PaginatedBooks> {
    const query = toQueryString(params);
    return apiRequest<PaginatedBooks>(
      `${CATALOG_SERVICE_URL}/books${query ? `?${query}` : ""}`
    );
  },

  async getBookById(id: number): Promise<Book> {
    return apiRequest<Book>(`${CATALOG_SERVICE_URL}/books/${id}`);
  },

  async getBooksCount(): Promise<{ totalBooks: number }> {
    return apiRequest<{ totalBooks: number }>(`${CATALOG_SERVICE_URL}/books/count`);
  },

  async getBooksByIds(ids: number[]): Promise<Book[]> {
    return Promise.all(ids.map((id) => this.getBookById(id)));
  },
};

export default catalogService;