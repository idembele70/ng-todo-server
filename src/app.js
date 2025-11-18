import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './modules/routes.js';
import ipFilterMiddleware from './core/middleware/ip-filter.middleware.js';
import { env } from './config/env.js';

const app = express();

app
  .use(cors({
    origin: env.FRONT_END_URL,
  }))
  .use(ipFilterMiddleware)
  .use(express.json())
  .use('/api', routes)

  .use((err, _req, res, _next) => {
    console.error(err.message);
    res.status(500).send('An error occurred!');
  });

export default app;