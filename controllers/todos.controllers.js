import db from '../database/index.db.js'

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await db.query('SELECT * FROM todos');
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}