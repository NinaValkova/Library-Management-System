export enum BorrowEvent {
  BORROW_BOOK = "borrow_book",
  RETURN_BOOK = "return_book",
}

export type TOPIC_TYPE = "BorrowEvents" | "CatalogEvents";

export interface MessageType {
  headers?: Record<string, any>;
  event: BorrowEvent;
  data: Record<string, any>;
}