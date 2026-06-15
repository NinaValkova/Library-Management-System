import dotnev from 'dotenv';
dotnev.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const APP_PORT = process.env.PORT;