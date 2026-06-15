import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const APP_PORT = process.env.PORT;
export const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL || "http://localhost:4000";
export const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:4001";