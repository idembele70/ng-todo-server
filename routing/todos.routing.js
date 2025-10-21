import { Router } from "express";
import { addOneTodo, deleteAllTodosController, deleteOneTodo, getAllTodos, getOneTodo, todoExistsByTitle, updateOneTodo } from "../controllers/todos.controllers.js";

const router = Router()

router.get('/exists', todoExistsByTitle);
router.post('/new', addOneTodo);

router.get('/', getAllTodos);
router.delete('/', deleteAllTodosController);

router.get('/:id', getOneTodo);
router.delete('/:id', deleteOneTodo);
router.put('/:id', updateOneTodo);

export default router;