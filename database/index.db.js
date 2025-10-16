import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  POOL_CONNECTION_LIMIT,
  POOL_QUEUE_LIMIT,
 } = process.env

 const pool = mysql.createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME,
   port: Number(DB_PORT),
   waitForConnections: true,
   connectionLimit: Number(POOL_CONNECTION_LIMIT),
   queueLimit: Number(POOL_QUEUE_LIMIT),
 });

async function query(sql, params) {
  const [results] = await pool.query(sql, params);
  return results;
}

export default {
  query
}
