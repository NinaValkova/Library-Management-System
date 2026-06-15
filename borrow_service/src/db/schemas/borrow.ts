import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const borrowRecords = pgTable("borrow_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bookId: integer("book_id").notNull(),
  bookTitle: varchar("book_title", { length: 255 }).notNull(),

  status: varchar("status", { length: 30 }).notNull().default("borrowed"),

  borrowedAt: timestamp("borrowed_at").notNull().defaultNow(),
  dueAt: timestamp("due_at").notNull(),
  returnedAt: timestamp("returned_at"),

  fineAmount: numeric("fine_amount").notNull().default("0"),
  finePaid: boolean("fine_paid").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type BorrowRecord = InferSelectModel<typeof borrowRecords>;
export type NewBorrowRecord = InferInsertModel<typeof borrowRecords>;