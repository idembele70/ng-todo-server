import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_USER_PASSWORD,
  DB_DOCKER_PORT,
  DB_LOCAL_PORT,
  DB_NAME,
  POOL_CONNECTION_LIMIT,
  POOL_QUEUE_LIMIT,
  NODE_ENV
 } = process.env

const DB_PORT = NODE_ENV === 'development' ? DB_LOCAL_PORT : DB_DOCKER_PORT;

 const pool = mysql.createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_USER_PASSWORD,
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
