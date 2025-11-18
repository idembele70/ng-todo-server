import mysql from 'mysql2/promise';
import { env } from './env.js';
const {
  DB_HOST,
  DB_USER,
  DB_USER_PASSWORD,
  DB_PORT,
  DB_NAME,
  POOL_CONNECTION_LIMIT,
  POOL_QUEUE_LIMIT,
 } = env

 const pool = mysql.createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_USER_PASSWORD,
   database: DB_NAME,
   port: DB_PORT,
   waitForConnections: true,
   connectionLimit: POOL_CONNECTION_LIMIT,
   queueLimit: POOL_QUEUE_LIMIT,
 });

async function query(sql, params) {
  const [results] = await pool.query(sql, params);
  return results;
}

export default {
  query
}
