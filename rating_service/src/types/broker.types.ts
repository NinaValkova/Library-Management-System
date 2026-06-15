export enum RatingEvent {
  BOOK_RATED = "book_rated",
}

export type TOPIC_TYPE = "RatingEvents" | "CatalogEvents";

export interface MessageType {
  headers?: Record<string, any>;
  event: RatingEvent;
  data: Record<string, any>;
}