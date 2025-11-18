import TodoService from './todo.service.js';

export const getAllTodos = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await TodoService.getAll(req.query));
  } catch (error) {
    next(error);
  }
}

export const getOneTodo = async (req, res, next) => {
  try {
    const todo = await TodoService.getOne(req.params.id);
    res
      .status(200)
      .json(todo);
  } catch (err) {
    next(err);
  }
}

export const todoExistsByTitle = async (req, res, next) => {
  try {
    const exists = TodoService.existsByTitle(req.query.title);
    res
      .status(200)
      .json({ exists });
  } catch (error) {
    next(error);
  }
}

export const addOneTodo = async (req, res, next) => {
  try {
    const todo = await TodoService.addOne(req.body.title);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export const deleteOneTodo = async (req, res, next) => {
  try {
    const deleted = await TodoService.deleteOne(req.params.id)
    if (deleted)
      return res.sendStatus(204);
    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}

export const deleteAllTodosController = async (req, res, next) => {
  try {
    const isCompleted = req.query.complete === 'true';
    const deleted = await TodoService.deleteAll(isCompleted);
    if (deleted)
      res.sendStatus(204);
    res.sendStatus(404);
  } catch (error) {
    next(error)
  }
}

export const updateOneTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoService.updateOne({
      ...req.body,
      ...req.params,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}