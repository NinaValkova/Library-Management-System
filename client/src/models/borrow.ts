export interface BorrowRecord {
  id: number;
  userId: number;
  bookId: number;
  bookTitle: string;
  status: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt?: string | null;
  fineAmount: string;
  finePaid: boolean;
  createdAt?: string;
  updatedAt?: string;
}