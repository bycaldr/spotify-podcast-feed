import { Context } from 'koa';
import { config } from '../../config';

export const saveTokenToCookies = (ctx: Context, token: string) => {
  ctx.cookies.set(config.AUTH_COOKIE_KEY, token, { signed: true });
};

export const removeTokenFromCookies = (ctx: Context) => {
  ctx.cookies.set(config.AUTH_COOKIE_KEY, '', { signed: true });
};
