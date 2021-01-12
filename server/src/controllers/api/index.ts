import Router from 'koa-router';

import auth from './auth';
import feed from './feed';

const controller = new Router({ prefix: '/api' });

controller.use(auth.middleware());
controller.use(feed.middleware());

export default controller;
