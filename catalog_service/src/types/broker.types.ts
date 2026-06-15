export enum CatalogEvents {
  BORROW_BOOK = "borrow_book",
  RETURN_BOOK = "return_book",
  BOOK_RATED = "book_rated",
}

export type TOPIC_TYPE = "CatalogEvents" | "BorrowEvents" | "RatingEvents";

export interface MessageType {
  headers?: Record<string, any>;
  event: CatalogEvents;
  data: Record<string, any>;
}