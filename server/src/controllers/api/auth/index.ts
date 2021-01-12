import Router from 'koa-router';

import callback from './callback';
import login from './login';
import logout from './logout';
import me from './me';

const controller = new Router({ prefix: '/auth' });

controller.use(callback.middleware());
controller.use(login.middleware());
controller.use(logout.middleware());
controller.use(me.middleware());

export default controller;
