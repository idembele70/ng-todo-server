import 'dotenv/config';
import express from 'express';

import router from './routing/index.routing.js';

const app = express();

app.use(express.json());
app.use(router);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})