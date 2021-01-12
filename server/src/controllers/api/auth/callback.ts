import joiRouter from 'koa-joi-router';

import {
  factoryAuthByCode,
  saveTokenToCookies,
} from '../../../middlewares/auth';

const router = joiRouter();

type Query = {
  code: string;
  state: string;
};

router.route({
  path: '/callback',
  method: 'get',
  handler: [
    async (ctx) => {
      const { code } = ctx.request.query as Query;

      const { token, user } = await factoryAuthByCode(code);

      // save token to cookie
      saveTokenToCookies(ctx, token);

      ctx.body = { user };
    },
  ],
});

export default router;
