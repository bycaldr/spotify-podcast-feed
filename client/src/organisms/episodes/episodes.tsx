import React, { useMemo } from "react";
import dayjs from "dayjs";

import { ShowEpisode } from "~types/spotify";

import "./episodes.scss";

type Props = {
  episodes: ShowEpisode[];
};

export const Episodes = ({ episodes }: Props) => {
  const episodesItems = useMemo(
    () =>
      episodes.map(
        ({ id, name, description, images, external_urls, release_date }) => (
          <a
            href={external_urls.spotify}
            rel="noopener noreferrer"
            target="_blank"
            key={id}
          >
            <div className="episodeItem d-flex mb-2">
              <div
                className="episodeCover"
                style={{ backgroundImage: `url('${images[0].url}')` }}
              />
              <div className="episodeContent">
                <h4>{name}</h4>
                <p>{description.slice(0, 120)}</p>

                <div className="episodeReleaseDate">
                  {dayjs(release_date).format("LL")}
                </div>
              </div>
            </div>
          </a>
        )
      ),
    [episodes]
  );

  return (
    <div className="episodes">
      {/* items */}
      {episodesItems}
      {/* no items message */}
      {!Boolean(episodes.length) && (
        <h4 className="text-center">No episodes found.</h4>
      )}
    </div>
  );
};
