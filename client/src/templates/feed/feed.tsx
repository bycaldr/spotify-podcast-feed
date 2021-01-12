import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { parse as queryParse, stringify as queryStringify } from "querystring";

import { listFeed, Feed as FeedRes } from "~api";

import { Loader } from "~atoms/loader/loader";

import { Shows } from "~organisms/shows";
import { Episodes } from "~organisms/episodes";

import "./feed.scss";

export const Feed = () => {
  const [feed, setFeed] = useState<FeedRes>();
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const { replace } = useHistory();
  const releasedSince = useMemo(() => {
    const { releasedSince } = queryParse(search.replace("?", ""));
    if (!releasedSince) return dayjs().startOf("day");

    return dayjs(releasedSince as string);
  }, [search]);

  useEffect(() => {
    setLoading(true);

    listFeed({
      releasedSince,
    }).then(
      (feed) => {
        setFeed(feed);
        setLoading(false);
      },
      (err) => {
        alert(
          "There was an error when loading feed. Try to refresh page. If problem persists, contact me on caldr.l@hotmail.com"
        );
        setLoading(false);
      }
    );
  }, [releasedSince]);

  const nextReleasedSince = useMemo(() => {
    return dayjs(releasedSince).add(-1, "day");
  }, [releasedSince]);

  const onFetchMore = useCallback(
    (e) => {
      e.preventDefault();

      replace({
        search: queryStringify({
          releasedSince: nextReleasedSince.format("YYYY-MM-DD"),
        }),
      });
    },
    [nextReleasedSince, replace]
  );

  return (
    <div className="feed">
      {/* loading */}
      {loading && !feed && <Loader />}
      {/* shows */}
      {feed && (
        <div className="container">
          <h2>Followed shows</h2>
          <Shows shows={feed.savedShows} />
          <h2>Episodes feed</h2>
          <Episodes episodes={feed.showsFeed} />
          <div className="d-flex justify-content-center mb-5">
            <a href="#" className="btn mt-4" onClick={onFetchMore}>
              {loading ? (
                <>Loading...</>
              ) : (
                <>Load more ({nextReleasedSince.format("DD MMM")})</>
              )}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
