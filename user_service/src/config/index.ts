import dotnev from 'dotenv';
import jwt, { SignOptions } from "jsonwebtoken";
dotnev.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const APP_PORT = process.env.PORT;


export const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1d";