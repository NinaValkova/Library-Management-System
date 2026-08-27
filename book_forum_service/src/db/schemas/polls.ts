import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").notNull(),

  username: varchar("username", {
    length: 32,
  }).notNull(),

  question: text("question").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export type Poll = typeof polls.$inferSelect;
export type NewPoll = typeof polls.$inferInsert;