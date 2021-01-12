import joiRouter, { Joi } from 'koa-joi-router';
import dayjs from 'dayjs';
import pLimit from 'p-limit';
import sortBy from 'lodash/sortBy';

import {
  StateWithAuth,
  factoryAuthMiddleware,
} from '../../../middlewares/auth';

import {
  getShowEpisodesReleasedSince,
  listAllPages,
  Show,
  ShowEpisode,
} from '../../../utils/spotify';

const router = joiRouter();

type Query = {
  releasedSince: Date;
};

router.route({
  path: '/',
  method: 'get',
  validate: {
    query: {
      releasedSince: Joi.date().default(() =>
        // start of yesterday
        dayjs().add(-1, 'day').startOf('day').toDate(),
      ),
    },
  },
  handler: [
    factoryAuthMiddleware({}),
    async (ctx) => {
      const { auth } = ctx.state as StateWithAuth;
      let releasedSince = dayjs((ctx.query as Query).releasedSince)
        .startOf('day')
        .toDate();

      /**
       * --- get saved shows ---
       */
      const savedShows: Show[] = (
        await listAllPages(
          // TODO: fix missing types in @types/spotify-web...
          // @ts-ignore
          auth.spotify.client.getMySavedShows.bind(auth.spotify.client),
          {},
        )
      ).map(({ show }) => show);

      // fetch new episodes of shows
      const showsFeed: ShowEpisode[] = [];
      const limit = pLimit(5);
      const showsFeedPromise = savedShows
        .map((show) => async () => {
          const episodes = await getShowEpisodesReleasedSince(
            auth.spotify.client,
            show.id,
            releasedSince,
          );
          showsFeed.push(
            ...episodes.map((episode) => ({
              show,
              ...episode,
            })),
          );
        })
        .map(limit);
      await Promise.all(showsFeedPromise);

      const sortedShowsFeed = sortBy(
        showsFeed,
        ({ release_date }) => new Date(release_date),
      ).reverse();

      ctx.body = {
        savedShows,
        showsFeed: sortedShowsFeed,
      };
    },
  ],
});

export default router;
