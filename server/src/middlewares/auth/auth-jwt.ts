import jwt from 'koa-jwt';

import { config } from '../../config';

export const factoryJwtAuthMiddleware = () =>
  jwt({
    secret: config.JWT_SECRET,
    passthrough: true,
    key: 'auth',
    cookie: config.AUTH_COOKIE_KEY,
  });
