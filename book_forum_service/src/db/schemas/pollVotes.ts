import {
  pgTable,
  serial,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { polls } from "./polls";
import { pollOptions } from "./pollOptions";

export const pollVotes = pgTable(
  "poll_votes",

  {
    id: serial("id").primaryKey(),

    pollId: integer("poll_id")
      .notNull()
      .references(() => polls.id, {
        onDelete: "cascade",
      }),

    optionId: integer("option_id")
      .notNull()
      .references(() => pollOptions.id, {
        onDelete: "cascade",
      }),

    userId: integer("user_id")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },

  (table) => [
    uniqueIndex(
      "poll_votes_poll_user_unique"
    ).on(
      table.pollId,
      table.userId
    ),
  ]
);

export type PollVote =
  typeof pollVotes.$inferSelect;

export type NewPollVote =
  typeof pollVotes.$inferInsert;