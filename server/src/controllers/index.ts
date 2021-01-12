import Router from 'koa-router';

import apiController from './api';

const controller = new Router();

controller.use(apiController.middleware());

export default controller;
