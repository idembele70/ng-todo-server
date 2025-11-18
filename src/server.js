import app from './app.js';
import { env } from './config/env.js';

const server = app;

server.listen(env.PORT, () => {
  console.log(`Server running on port: ${env.PORT}`);
})