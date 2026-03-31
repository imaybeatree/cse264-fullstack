import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

// prisma uses the mariadb adapter for mysql
const adapter = new PrismaMariaDb(
  {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
  }
);

export const prisma = new PrismaClient({ adapter });