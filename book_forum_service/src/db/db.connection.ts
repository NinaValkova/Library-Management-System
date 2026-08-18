import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas";
import { DATABASE_URL } from "../config";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const DB: NodePgDatabase<typeof schema> = drizzle(pool, {
  schema,
});