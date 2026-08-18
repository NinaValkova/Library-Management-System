import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),

  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, {
      onDelete: "cascade",
    }),

  userId: integer("user_id").notNull(),

  username: varchar("username", {
    length: 32,
  }).notNull(),

  body: text("body").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;