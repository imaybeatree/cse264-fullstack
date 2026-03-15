import { pool } from "../db/db.js";

const connectToDb = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection error', err);
  }
};

connectToDb();