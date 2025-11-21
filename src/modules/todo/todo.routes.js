import { Router } from "express";
import { 
  addOneTodo,
  deleteAllTodos,
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
  .delete('/', deleteAllTodos)

  .get('/:id', getOneTodo)
  .delete('/:id', deleteOneTodo)
  .put('/:id', updateOneTodo);

export default router;