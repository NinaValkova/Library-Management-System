export interface BorrowBookMessage {
  bookId: number;
  userId: number;
}

export interface ReturnBookMessage {
  bookId: number;
  userId: number;
}

export interface BookRatedMessage {
  bookId: number;
  rating: number;
}