import { Router } from "express";
import { addOneTodo, deleteAllTodosController, deleteOneTodo, getAllTodos, getOneTodo, updateOneTodo } from "../controllers/todos.controllers.js";

const router = Router()

router.get('/todos', getAllTodos);
router.delete('/todos', deleteAllTodosController);
router.get('/todos/:id', getOneTodo);
router.delete('/todos/:id', deleteOneTodo);
router.put('/todos/:id', updateOneTodo);
router.post('/todos/new', addOneTodo);

export default router;