import { Router } from "express";
import { 
  addOneTodo,
  deleteAllTodosController,
  deleteOneTodo,
  getAllTodos,
  getOneTodo,
  todoExistsByTitle,
  updateOneTodo,
 } from "./todo.controller.js";

const router = Router()

router
  .get('/exists', todoExistsByTitle)
  .post('/new', addOneTodo)

  .get('/', getAllTodos)
  .delete('/', deleteAllTodosController)

  .get('/:id', getOneTodo)
  .delete('/:id', deleteOneTodo)
  .put('/:id', updateOneTodo);

export default router;