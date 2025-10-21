import db from '../database/index.db.js'

export const getAllTodos = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const {
      complete,
    } = req.query;

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
    sqlParts.push('LIMIT ? OFFSET ?');
    sqlParams.push(limit, offset);

    const todos = await db.query(sqlParts.join(' '), sqlParams);
    const [{ total }] = await db.query(countParts.join(' '), countParams);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit) || 1,
      totalItems: total,
      todos,
    });
  } catch (error) {
    next(error);
  }
}

export const getOneTodo = async (req, res, next) => {
  try {
    const todo = await db.query('SELECT * FROM todos WHERE id = ? ', [req.params.id]);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
}

export const todoExistsByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;

    const [rows] = await db.query('SELECT COUNT(*) AS count FROM todos WHERE title = ?', [title]);
    const exists = rows.count > 0;

    res.status(200).json({ exists });
  } catch (error) {
    next(error);
  }
}

export const addOneTodo = async (req, res, next) => {
  try {
    const { insertId } = await db.query('INSERT INTO todos (title) VALUES (?)', [req.body.title])
    const todos = await db.query('SELECT * FROM todos WHERE id = ?', [insertId]);
    const todo = todos[0];
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export const deleteOneTodo = async (req, res, next) => {
  try {
    await db.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export const deleteAllTodosController = async (req, res, next) => {
  try {
    const isCompleted = req.query.complete === 'true';
    const sqlParts = ['DELETE FROM todos'];
    const params = [];

    if (isCompleted) {
      sqlParts.push('WHERE complete = ?');
      params.push(isCompleted ? '1' : '0');
    }

    const sql = sqlParts.join(' ');
    console.log(sql)
    await db.query(sql, params);
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}

export const updateOneTodo = async (req, res, next) => {
  try {
    const { title, complete } = req.body;
    const { id } = req.params;
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
    const updatedTodo = await db.query('SELECT * FROM todos WHERE id = ?', [id])
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}