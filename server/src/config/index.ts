import dotenv from 'dotenv';

type Config = {
  PORT: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_SECRET: string;
  SPOTIFY_REDIRECT_URL: string;
  JWT_SECRET: string;
  KOA_KEY: string;
  AUTH_COOKIE_KEY: string;
  SENTRY_DSN: string;
};

const { parsed } = dotenv.config();
if (!parsed) throw Error('config cannot be parsed');

export const config = parsed as Config;
