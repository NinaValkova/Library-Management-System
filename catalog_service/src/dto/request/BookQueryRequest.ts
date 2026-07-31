export interface BookQueryRequest {
  pageIndex?: string;
  pageSize?: string;

  search?: string;
  category?: string;
  language?: string;
  isBorrowed?: string;
  sort?: string;
}