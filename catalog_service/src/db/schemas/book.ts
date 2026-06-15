import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  isbn: varchar("isbn", { length: 50 }).notNull().unique(),

  publishedYear: integer("published_year").notNull(),

  description: varchar("description", { length: 1000 }),
  category: varchar("category", { length: 100 }),
  language: varchar("language", { length: 50 }),

  imageUrl: varchar("image_url", { length: 1000 }),

  isBorrowed: boolean("is_borrowed").notNull().default(false),
  borrowedByUserId: integer("borrowed_by_user_id"),

  score5: integer("score_5").notNull().default(0),
  score4: integer("score_4").notNull().default(0),
  score3: integer("score_3").notNull().default(0),
  score2: integer("score_2").notNull().default(0),
  score1: integer("score_1").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Book = InferSelectModel<typeof books>;
export type NewBook = InferInsertModel<typeof books>;