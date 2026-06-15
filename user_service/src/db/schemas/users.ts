import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  firstName: varchar("first_name", { length: 50 }).notNull(),
  secondName: varchar("second_name", { length: 50 }).notNull(),

  username: varchar("username", { length: 32 }).notNull(),
  email: varchar("email", { length: 64 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  role: varchar("role", { length: 20 }).notNull().default("user"),
  birthNumber: varchar("birth_number", { length: 20 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;