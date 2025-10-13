import mysql from 'mysql2/promise';

const { DB_PROTOCOL, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env
const URL = `${DB_PROTOCOL}//${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

async function query(sql, params) {
  const connection = await mysql.createConnection(URL);
  const [results] = await connection.query(sql, params);
  return results;
}

export default {
  query
}
