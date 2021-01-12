import joiRouter from 'koa-joi-router';

import { factoryAuthMiddleware } from '../../../middlewares/auth';

const router = joiRouter();

router.route({
  path: '/me',
  method: 'get',
  handler: [
    factoryAuthMiddleware({}),
    async (ctx) => {
      ctx.body = ctx.state.auth.user;
    },
  ],
});

export default router;
