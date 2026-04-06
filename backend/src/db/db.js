import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

// prisma uses the mariadb adapter for mysql
const dbUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb(
  {
  host: dbUrl.hostname,
  port: Number(dbUrl.port || 3306),
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  connectionLimit: 10,
  allowPublicKeyRetrieval: true,
  }
);

export const prisma = new PrismaClient({ adapter });