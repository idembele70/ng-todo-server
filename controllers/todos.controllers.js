import db from '../database/index.db.js'

export const getAllTodos = async (req, res, next) => {
  try {
    const { complete, limit } = req.query;
    const sqlParts = ['SELECT * FROM todos'];
    const params = [];
    const conditions = [];

    if (complete !== undefined) {
      const isCompleted = complete === 'true';
      conditions.push('complete = ?')
      params.push(isCompleted ? 1 : 0);
    }

    if (conditions.length)
      sqlParts.push('WHERE', conditions.join(' AND '))

    if (limit) {
      sqlParts.push('LIMIT ?');
      params.push(Number(limit));
    }
    const sql = sqlParts.join(' ');

    const todos = await db.query(sql, params);
    res.status(200).json(todos);
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
    const { complete } = req.query;
    const sqlParts = ['DELETE FROM todos'];
    const params = [];

    if (complete) {
      const isCompleted = complete === 'true';
      sqlParts.push('WHERE complete = ?');
      params.push(isCompleted ? '1' : '0');
    }

    const sql = sqlParts.join(' ');

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