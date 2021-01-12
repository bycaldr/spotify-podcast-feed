import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { config } from './config';
import { factoryJwtAuthMiddleware } from './middlewares/auth';

const app = new Koa();

app.proxy = process.env.NODE_ENV === 'production';
app.keys = [config.KOA_KEY];

app.use(
  bodyParser({
    enableTypes: ['json'],
  }),
);

app.use(
  cors({
    credentials: true,
  }),
);
app.use(factoryJwtAuthMiddleware());

Promise.resolve()
  .then(() => {
    const router = require('./controllers').default;
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(config.PORT);
    // eslint-disable-next-line
    console.info(`App is listening on ${config.PORT}`);
  })
  // eslint-disable-next-line
  .catch(console.error);
