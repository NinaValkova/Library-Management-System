import { and, eq, isNull, count } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { borrowRecords, BorrowRecord, NewBorrowRecord } from "../db/schemas/borrow";

export type BorrowRepositoryType = {
  createBorrowRecord: (data: NewBorrowRecord) => Promise<BorrowRecord>;
  findActiveBorrowByBookId: (bookId: number) => Promise<BorrowRecord | undefined>;
  findActiveBorrowByUserAndBook: (userId: number, bookId: number) => Promise<BorrowRecord | undefined>;
  markReturned: (
    id: number,
    data: { returnedAt: Date; fineAmount: string; status: string }
  ) => Promise<BorrowRecord>;
  findCurrentBorrowsByUserId: (userId: number) => Promise<BorrowRecord[]>;
  findBorrowHistoryByUserId: (userId: number) => Promise<BorrowRecord[]>;
  findFineRecordsByUserId: (userId: number) => Promise<BorrowRecord[]>;
  countActiveBorrows: () => Promise<number>;
};

const createBorrowRecord = async (data: NewBorrowRecord): Promise<BorrowRecord> => {
  const [record] = await DB.insert(borrowRecords).values(data).returning();

  if (!record) {
    throw new Error("Failed to create borrow record");
  }

  return record;
};

const findActiveBorrowByBookId = async (bookId: number): Promise<BorrowRecord | undefined> => {
  return DB.query.borrowRecords.findFirst({
    where: and(
      eq(borrowRecords.bookId, bookId),
      eq(borrowRecords.status, "borrowed"),
      isNull(borrowRecords.returnedAt)
    ),
  });
};

const findActiveBorrowByUserAndBook = async (
  userId: number,
  bookId: number
): Promise<BorrowRecord | undefined> => {
  return DB.query.borrowRecords.findFirst({
    where: and(
      eq(borrowRecords.userId, userId),
      eq(borrowRecords.bookId, bookId),
      eq(borrowRecords.status, "borrowed"),
      isNull(borrowRecords.returnedAt)
    ),
  });
};

const markReturned = async (
  id: number,
  data: { returnedAt: Date; fineAmount: string; status: string }
): Promise<BorrowRecord> => {
  const [record] = await DB.update(borrowRecords)
    .set({
      returnedAt: data.returnedAt,
      fineAmount: data.fineAmount,
      status: data.status,
      updatedAt: new Date(),
    })
    .where(eq(borrowRecords.id, id))
    .returning();

  if (!record) {
    throw new Error("Borrow record not found");
  }

  return record;
};

const findCurrentBorrowsByUserId = async (userId: number): Promise<BorrowRecord[]> => {
  return DB.query.borrowRecords.findMany({
    where: and(
      eq(borrowRecords.userId, userId),
      eq(borrowRecords.status, "borrowed"),
      isNull(borrowRecords.returnedAt)
    ),
  });
};

const findBorrowHistoryByUserId = async (userId: number): Promise<BorrowRecord[]> => {
  return DB.query.borrowRecords.findMany({
    where: eq(borrowRecords.userId, userId),
  });
};

const findFineRecordsByUserId = async (userId: number): Promise<BorrowRecord[]> => {
  return DB.query.borrowRecords.findMany({
    where: and(
      eq(borrowRecords.userId, userId),
      eq(borrowRecords.finePaid, false)
    ),
  });
};

const countActiveBorrows = async (): Promise<number> => {
  const result = await DB.select({ value: count() })
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.status, "borrowed"),
        isNull(borrowRecords.returnedAt)
      )
    );

  return result[0]?.value ?? 0;
};

export const BorrowRepository: BorrowRepositoryType = {
  createBorrowRecord,
  findActiveBorrowByBookId,
  findActiveBorrowByUserAndBook,
  markReturned,
  findCurrentBorrowsByUserId,
  findBorrowHistoryByUserId,
  findFineRecordsByUserId,
  countActiveBorrows,
};