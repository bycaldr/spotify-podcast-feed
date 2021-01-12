import React, { useMemo } from "react";

import { Show } from "~types/spotify";

import "./shows.scss";

type Props = {
  shows: Show[];
};

export const Shows = ({ shows }: Props) => {
  const showItems = useMemo(
    () =>
      shows.map(({ name, images, external_urls, id }) => (
        <a
          href={external_urls.spotify}
          rel="noopener noreferrer"
          target="_blank"
          key={id}
        >
          <div className="showItem d-flex flex-column align-items-center">
            <img src={images[images.length - 1].url} width={64} alt="" />
            <span>{name}</span>
          </div>
        </a>
      )),
    [shows]
  );

  return (
    <div className="shows d-flex">
      {showItems}
      {!Boolean(showItems.length) && (
        <h4 className="text-center">No shows found.</h4>
      )}
    </div>
  );
};
