export interface BorrowBookResponse {
  id: number;
  userId: number;
  bookId: number;
  bookTitle: string;
  status: string;
  borrowedAt: Date;
  dueAt: Date;
  returnedAt: Date | null;
  fineAmount: string;
  finePaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}