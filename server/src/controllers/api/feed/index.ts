import Router from 'koa-router';

import list from './list';

const controller = new Router({ prefix: '/feed' });

controller.use(list.middleware());

export default controller;
