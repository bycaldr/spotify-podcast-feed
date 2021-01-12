import joiRouter from 'koa-joi-router';

import { getSpotifyAuthUrl } from '../../../utils/spotify';

const router = joiRouter();

router.route({
  path: '/login',
  method: 'get',
  handler: [
    async (ctx) => {
      const authorizeURL = getSpotifyAuthUrl('');
      ctx.body = { authorizeURL };
    },
  ],
});

export default router;
