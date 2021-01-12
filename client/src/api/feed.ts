import dayjs, { Dayjs } from "dayjs";
import { Show, ShowEpisode } from "~types/spotify";

import { apiClient } from "./client";

export type Feed = {
  savedShows: Show[];
  showsFeed: ShowEpisode[];
};

type ListFeedOptions = {
  releasedSince?: Dayjs;
};

export const listFeed = async (options: ListFeedOptions) => {
  const { releasedSince } = options;

  const { data } = await apiClient.request<Feed>({
    method: "GET",
    url: "/feed",
    params: {
      releasedSince: releasedSince
        ? releasedSince.format("YYYY-MM-DD")
        : undefined,
    },
  });
  return data;
};
