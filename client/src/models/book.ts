export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description?: string | null;
  category?: string | null;
  language?: string | null;
  imageUrl?: string | null;
  isBorrowed: boolean;
  borrowedByUserId?: number | null;
  score?: string | number | null;
  ratingsCount?: number | null;
  createdAt?: string;
}

export interface BooksQueryParams {
  pageIndex: number;
  pageSize: number;
  search?: string;
  category?: string;
  language?: string;
  isBorrowed?: string;
  sort?: string;
}

export interface PaginatedBooks {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Book[];
}