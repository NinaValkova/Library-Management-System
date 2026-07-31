import { BookResponse } from "./BookResponse";

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: BookResponse[];
}