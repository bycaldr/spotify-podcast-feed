import joiRouter from 'koa-joi-router';

import { removeTokenFromCookies } from '../../../middlewares/auth';

const router = joiRouter();

router.route({
  path: '/logout',
  method: 'post',
  handler: [
    async (ctx) => {
      removeTokenFromCookies(ctx);
      ctx.body = { success: true };
    },
  ],
});

export default router;
