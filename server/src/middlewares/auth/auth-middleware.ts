import { Next, ParameterizedContext } from 'koa';
import SpotifyWebApi from 'spotify-web-api-node';

import { factorySpotifyClient } from '../../utils/spotify';

import { saveTokenToCookies } from './auth-cookies';
import { factoryAuth, RawAuthState } from './auth-factory';

type FactoryAuthMiddlewareOpts = {
  authRequired?: boolean;
};

type StateWithRawAuth = {
  auth?: RawAuthState;
};

export type StateWithAuth = {
  auth: RawAuthState & {
    spotify: {
      client: SpotifyWebApi;
    };
  };
};

const SPOTIFY_TOKEN_EXPIRY_OFFSET = 10000;

export const factoryAuthMiddleware = ({
  authRequired = true,
}: FactoryAuthMiddlewareOpts) => async (
  ctx: ParameterizedContext<StateWithRawAuth>,
  next: Next,
) => {
  const { auth } = ctx.state;

  if (!auth && authRequired) {
    return ctx.throw(401);
  }

  if (auth) {
    const client = factorySpotifyClient(auth.spotify);
    // @ts-ignore
    auth.spotify.client = client;

    // check token expiry
    const expires = new Date(auth.spotify.expires).getTime() || 0;
    const now = new Date().getTime();
    if (expires - now < SPOTIFY_TOKEN_EXPIRY_OFFSET) {
      console.log('token expired, refreshing');

      // refresh access token
      const { body } = await client.refreshAccessToken();
      client.setAccessToken(body['access_token']);

      // set new token
      const { token } = await factoryAuth({
        accessToken: body['access_token'],
        refreshToken: auth.spotify.refreshToken,
        expiresIn: body['expires_in'],
      });
      saveTokenToCookies(ctx, token);
    }
  }

  await next();
};
