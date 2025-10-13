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
    const todo = await db.query('select * FROM todos WHERE id = ? ', [req.params.id]);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
}