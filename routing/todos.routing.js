import { Router } from "express";
import { getAllTodos } from "../controllers/todos.controllers.js";

const router = Router()

router.get('/todos', getAllTodos);

export default router;