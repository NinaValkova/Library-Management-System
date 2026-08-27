import {
  pgTable,
  serial,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

import { polls } from "./polls";

export const pollOptions = pgTable("poll_options", {
  id: serial("id").primaryKey(),

  pollId: integer("poll_id")
    .notNull()
    .references(() => polls.id, {
      onDelete: "cascade",
    }),

  text: varchar("text", {
    length: 255,
  }).notNull(),
});

export type PollOption =
  typeof pollOptions.$inferSelect;

export type NewPollOption =
  typeof pollOptions.$inferInsert;