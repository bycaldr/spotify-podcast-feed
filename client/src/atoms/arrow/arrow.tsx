import React from "react";

import "./arrow.scss";

type Props = {
  orientation?: "left" | "right" | "top" | "bottom";
};

export const Arrow = ({ orientation = "bottom" }: Props) => (
  <svg
    viewBox="0 0 27.4 15.7"
    width="1em"
    className={`arrow arrow--${orientation}`}
  >
    <g transform="translate(-18.3,-24.4)">
      <g transform="translate(237,335)">
        <polyline
          fill="#ffffff"
          points="-218.7,-308.6 -216.7,-310.6 -205,-298.8 -193.3,-310.6 -191.3,-308.6 -205,-294.9      -218.7,-308.6    "
        />
      </g>
    </g>
  </svg>
);
