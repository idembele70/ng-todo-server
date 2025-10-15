import db from '../database/index.db.js'

export const getAllTodos = async (_req, res, next) => {
  try {
    const todos = await db.query('SELECT * FROM todos');
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

export const deleteAllTodosController = async (_req, res, next) => {
  try {
    await db.query('DELETE FROM todos');
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
    const updatedTodo =  await db.query('SELECT * FROM todos WHERE id = ?', [id])
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}