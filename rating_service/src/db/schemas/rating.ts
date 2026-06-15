import {
  pgTable,
  serial,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const ratings = pgTable(
  "ratings",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id").notNull(),
    bookId: integer("book_id").notNull(),

    rating: integer("rating").notNull(), 

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userBookUnique: uniqueIndex("ratings_user_book_unique").on(
      table.userId,
      table.bookId
    ),
  })
);

export type Rating = InferSelectModel<typeof ratings>;
export type NewRating = InferInsertModel<typeof ratings>;