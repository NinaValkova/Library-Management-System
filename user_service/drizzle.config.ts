import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/config"

export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});