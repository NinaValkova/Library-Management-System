import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { posts } from "./posts";

export const likes = pgTable(
  "likes",
  {
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

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },

  (table) => [
    uniqueIndex(
      "likes_post_user_unique"
    ).on(table.postId, table.userId),
  ]
);

export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;