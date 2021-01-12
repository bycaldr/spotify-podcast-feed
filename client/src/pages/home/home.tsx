import React from "react";

import { SpotifyLogo } from "~atoms/spotify-logo";

import { Nav } from "~templates/nav";
import { Feed } from "~templates/feed";
import { Footer } from "~templates/footer";

import "./home.scss";

export const Home = () => {
  return (
    <>
      {/* nav */}
      <Nav />

      {/* welcome */}
      <h1 className="home mt-3 mb-4">
        Your <SpotifyLogo /> shows feed 🎙️
      </h1>

      {/* feed */}
      <Feed />

      {/* footer */}
      <Footer />
    </>
  );
};
