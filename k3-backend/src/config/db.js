// src/config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});


pool.on('error', (err) => {
  console.error('Unexpected PG error', err);
});

export default {
  query: (text, params) => pool.query(text, params),
  pool
};
pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ DB CONNECTED:", res.rows[0]);
  })
  .catch((err) => {
    console.error("❌ DB CONNECTION FAILED:", err.message);
  });
