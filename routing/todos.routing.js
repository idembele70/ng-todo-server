import { Router } from "express";
import { getAllTodos, getOneTodo } from "../controllers/todos.controllers.js";

const router = Router()

router.get('/todos', getAllTodos);
router.get('/todos/:id', getOneTodo);

export default router;