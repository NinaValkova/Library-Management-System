export class BookQueryParams {
  pageIndex: number = 1;
  pageSize: number = 6;

  search?: string;
  category?: string;
  language?: string;
  isBorrowed?: string;
  sort?: string;
}