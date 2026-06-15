import { eq, count } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { users,  User,  NewUser } from "../db/schemas";

export type UserRepositoryType = {
  createUser: (data: NewUser) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
  findById: (id: number) => Promise<User | undefined>;
  countUsers: () => Promise<number>;
};

const createUser = async (data: NewUser): Promise<User> => {
  const [user] = await DB.insert(users).values(data).returning();

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
};

const findByEmail = async (email: string): Promise<User | undefined> => {
  return DB.query.users.findFirst({
    where: eq(users.email, email),
  });
};

const findByUsername = async (username: string): Promise<User | undefined> => {
  return DB.query.users.findFirst({
    where: eq(users.username, username),
  });
};

const findById = async (id: number): Promise<User | undefined> => {
  return DB.query.users.findFirst({
    where: eq(users.id, id),
  });
};

const countUsers = async (): Promise<number> => {
  const result = await DB.select({ value: count() }).from(users);
  return result[0]?.value ?? 0;
};

export const UserRepository: UserRepositoryType = {
  createUser,
  findByEmail,
  findByUsername,
  findById,
  countUsers,
};