import db from '../../config/db.config.js';

export default class TodoService {
  static async getAll(query) {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const {
      complete,
    } = query;

    const sqlParts = ['SELECT * FROM todos'];
    const countParts = ['SELECT COUNT(*) AS total FROM todos'];
    const conditions = [];
    const sqlParams = [];
    const countParams = [];

    if (complete !== undefined) {
      const isCompleted = complete === 'true';
      conditions.push('complete = ?');
      sqlParams.push(isCompleted ? 1 : 0);
      countParams.push(isCompleted ? 1 : 0);
    }

    if (conditions.length) {
      const whereClause = 'WHERE ' + conditions.join(' AND ');
      sqlParts.push(whereClause);
      countParts.push(whereClause);
    }
    const offset = (page - 1) * limit;
    sqlParts.push('ORDER BY createdAt DESC LIMIT ? OFFSET ?');
    sqlParams.push(limit, offset);

    const todos = await db.query(sqlParts.join(' '), sqlParams);
    const [{ total }] = await db.query(countParts.join(' '), countParams);

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit) || 1,
      totalItems: total,
      todos,
    };
  }

  static getOne(id) {
    return db.query('SELECT * FROM todos WHERE id = ? ', [id]);
  }

  static async existsByTitle(title) {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM todos WHERE title = ?', [title]);
    return rows.count > 0;
  }

  static async addOne(title) {
    const { insertId } = await db.query('INSERT INTO todos (title) VALUES (?)', [title])
    const todos = await db.query('SELECT * FROM todos WHERE id = ?', [insertId]);
    return todos[0];
  }

  static async deleteOne(id) {
    const result = await db.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async deleteAll(isCompleted) {
    const sqlParts = ['DELETE FROM todos'];
    const params = [];

    if (isCompleted) {
      sqlParts.push('WHERE complete = ?');
      params.push(isCompleted ? '1' : '0');
    }

    const sql = sqlParts.join(' ');

    await db.query(sql, params);
  }

  static async updateOne({ title, complete, id }) {
    const updates = [];
    const params = [];

    if (title) {
      updates.push('title = ?');
      params.push(title);
    }
    if ([0, 1].includes(complete)) {
      updates.push('complete = ?');
      params.push(complete)
    }
    const sql = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;
    params.push(id)
    await db.query(sql, params);
    return await db.query('SELECT * FROM todos WHERE id = ?', [id]);

  }
}