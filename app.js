import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routing/index.routing.js';
import ipFilterMiddleware from './middleware/ip-filter.middleware.js';


const app = express();

const { FRONT_END_URL, APP_LOCAL_PORT } = process.env;


app.use(cors({
  origin: FRONT_END_URL,
}));
app.use(ipFilterMiddleware);
app.use(express.json());
app.use('/api', routes);

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).send('An error occurred!');
})

app.listen(APP_LOCAL_PORT, () => {
  console.log(`Server running on port: ${APP_LOCAL_PORT}`);
})