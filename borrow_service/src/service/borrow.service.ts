import { BorrowRepository, BorrowRepositoryType } from "../repository/borrow.repository";
import { SendBorrowBookMessage, SendReturnBookMessage } from "./broker.service";
import { GetBookDetails } from "../utils/broker/api";

const BORROW_DAYS = 10;
const FINE_PER_DAY = 5;

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calculateFine = (dueAt: Date, returnedAt: Date): number => {
  if (returnedAt <= dueAt) return 0;

  const diffMs = returnedAt.getTime() - dueAt.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays * FINE_PER_DAY;
};

export const BorrowBook = async (
  userId: number,
  bookId: number,
  repo: BorrowRepositoryType = BorrowRepository
) => {
  const existingActiveBookBorrow = await repo.findActiveBorrowByBookId(bookId);
  if (existingActiveBookBorrow) {
    throw new Error("Book is already borrowed");
  }

  const book = await GetBookDetails(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.isBorrowed) {
    throw new Error("Book is already borrowed");
  }

  const borrowedAt = new Date();
  const dueAt = addDays(borrowedAt, BORROW_DAYS);

  const record = await repo.createBorrowRecord({
    userId,
    bookId,
    bookTitle: book.title,
    borrowedAt,
    dueAt,
    status: "borrowed",
    fineAmount: "0",
    finePaid: false,
  });

  await SendBorrowBookMessage({
    bookId,
    userId,
  });

  return record;
};

export const ReturnBook = async (
  userId: number,
  bookId: number,
  repo: BorrowRepositoryType = BorrowRepository
) => {
  const activeBorrow = await repo.findActiveBorrowByUserAndBook(userId, bookId);

  if (!activeBorrow) {
    throw new Error("Active borrow record not found");
  }

  const returnedAt = new Date();
  const fine = calculateFine(activeBorrow.dueAt, returnedAt);

  const updated = await repo.markReturned(activeBorrow.id, {
    returnedAt,
    fineAmount: fine.toString(),
    status: fine > 0 ? "overdue" : "returned",
  });

  await SendReturnBookMessage({
    bookId,
    userId,
  });

  return updated;
};

export const GetCurrentBorrows = async (
  userId: number,
  repo: BorrowRepositoryType = BorrowRepository
) => {
  return repo.findCurrentBorrowsByUserId(userId);
};

export const GetBorrowHistory = async (
  userId: number,
  repo: BorrowRepositoryType = BorrowRepository
) => {
  return repo.findBorrowHistoryByUserId(userId);
};

export const GetLoanItems = async (
  userId: number,
  repo: BorrowRepositoryType = BorrowRepository
) => {
  const records = await repo.findFineRecordsByUserId(userId);
  return records.filter((item) => Number(item.fineAmount) > 0);
};


export const GetActiveBorrowsCount = async (
  repo: BorrowRepositoryType = BorrowRepository
) => {
  const count = await repo.countActiveBorrows();
  return { activeBorrows: count };
};