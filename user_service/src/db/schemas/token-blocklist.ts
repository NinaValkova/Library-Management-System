import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const tokenBlocklist = pgTable("token_blocklist", {
  id: serial("id").primaryKey(),
  jti: varchar("jti", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TokenBlocklist = InferSelectModel<typeof tokenBlocklist>;
export type NewTokenBlocklist = InferInsertModel<typeof tokenBlocklist>;