import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").notNull(),

  username: varchar("username", {
    length: 32,
  }).notNull(),

  heading: varchar("heading", {
    length: 255,
  }).notNull(),

  body: text("body").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;