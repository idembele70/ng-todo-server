import express from 'express';
import { healthCheck } from '../controllers/health.controllers.js';

const router = express.Router();

router.use('/health', healthCheck);

export default router;