import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

const pool = mariadb.createPool(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb(pool);

export const prisma = new PrismaClient({ adapter });