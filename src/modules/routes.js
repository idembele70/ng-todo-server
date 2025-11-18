import express from 'express';
import healthRoutes from '../core/health/health.routes.js';
import todoRoutes from './todo/todo.routes.js';

const router = express.Router();

router
  .use('/health', healthRoutes)
  .use('/todos', todoRoutes);

export default router;