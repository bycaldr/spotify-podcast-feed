import dayjs from 'dayjs';
import SpotifyWebApi from 'spotify-web-api-node';

import { config } from '../config';

/**
 * --- Factory client ---
 */
type FactoryClientOptions = {
  accessToken?: string;
  refreshToken?: string;
};
export const factorySpotifyClient = (options?: FactoryClientOptions) => {
  return new SpotifyWebApi({
    clientId: config.SPOTIFY_CLIENT_ID,
    clientSecret: config.SPOTIFY_SECRET,
    redirectUri: config.SPOTIFY_REDIRECT_URL,
    ...(options || {}),
  });
};

/**
 * --- Auth/default client ---
 */
export const spotify = factorySpotifyClient();
const authScopes = ['user-library-read', 'user-read-email'];
export const getSpotifyAuthUrl = (state: string) => {
  return spotify.createAuthorizeURL(authScopes, state);
};

/**
 * --- Utils ---
 */
type PaginationOptions = {
  limit?: number;
  offset?: number;
};
type PaginatedRes<T = any> = {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};
type PaginateHandler<T = PaginatedRes> = (
  opts: PaginationOptions,
) => Promise<{
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}>;
// --- pagination list all pages ---
export const listAllPages = async <T = any>(
  handler: PaginateHandler<T>,
  handlerOptions: Record<string, any>,
) => {
  let total;
  const limit = 20;
  let offset = 0;

  const data = [];

  do {
    const { body } = await handler({
      limit,
      offset,
      ...handlerOptions,
    });
    // @ts-ignore
    total = body.total;
    // @ts-ignore
    data.push(...body.items);
    offset += limit;
  } while (!total || total > data.length);

  return data;
};

// --- fetch show episodes released since ---
export const getShowEpisodesReleasedSince = async (
  client: SpotifyWebApi,
  showId: string,
  releasedSince: Date,
) => {
  const limit = 5;
  let offset = 0;

  const episodes: ShowEpisode[] = [];
  let endReached = false;
  do {
    // TODO: fix missing types in @types/spotify-web...
    // @ts-ignore
    const res = (await client.getShowEpisodes(showId, {
      limit,
      offset,
    })) as ClientResponse<PaginatedRes<ShowEpisode>>;

    const { body } = res;

    if (!body.items.length) endReached = true;

    body.items.forEach((episode) => {
      const released = dayjs(episode.release_date).startOf('day').toDate();
      if (released.getTime() >= releasedSince.getTime()) {
        episodes.push(episode);
      } else {
        endReached = true;
      }
    });

    offset += limit;
  } while (!endReached);

  return episodes;
};

/**
 * --- types ---
 */
type ClientResponse<T> = {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
};

type ExternalUrls = {
  spotify: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

export type ShowEpisode = {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
};

export type Show = {
  available_markets: string[];
  copyrights: any[];
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: string;
  uri: string;
};
