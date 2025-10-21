import express from 'express';
import healthRouter from './health.routing.js';
import todosRouter from './todos.routing.js';

const router = express.Router();

router.use(healthRouter);
router.use('/todos', todosRouter)

export default router;