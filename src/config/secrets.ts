import dotenv from 'dotenv';
dotenv.config();

export const MONGOURI = process.env.MONGOURI;
export const SESSION_SECRET = process.env.SESSION_SECRET;
