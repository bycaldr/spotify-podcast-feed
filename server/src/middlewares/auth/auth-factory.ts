import dayjs from 'dayjs';
import jsonwebtoken from 'jsonwebtoken';

import { config } from '../../config';
import { factorySpotifyClient, spotify } from '../../utils/spotify';

export type RawAuthState = {
  spotify: {
    accessToken: string;
    refreshToken: string;
    expires: string;
  };
  user: any;
};

export const factoryAuthByCode = async (code: string) => {
  const codeGrant = await spotify.authorizationCodeGrant(code);

  const auth = await factoryAuth({
    accessToken: codeGrant.body['access_token'],
    refreshToken: codeGrant.body['refresh_token'],
    expiresIn: codeGrant.body['expires_in'],
  });

  return auth;
};

type FactoryAuthOptions = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
export const factoryAuth = async ({
  accessToken,
  refreshToken,
  expiresIn,
}: FactoryAuthOptions) => {
  const userSpotifyClient = factorySpotifyClient({
    accessToken,
    refreshToken,
  });

  const { body } = await userSpotifyClient.getMe();

  const user = {
    ...body,
  };

  const auth: RawAuthState = {
    spotify: {
      accessToken,
      refreshToken,
      expires: dayjs().add(expiresIn, 'second').toISOString(),
    },
    user,
  };

  const token = jsonwebtoken.sign(auth, config.JWT_SECRET);

  return { token, user };
};
