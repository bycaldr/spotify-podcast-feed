import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { authLogin } from "~api";
import { useAuth } from "~utils/auth";

import { Footer } from "~templates/footer";

import "./welcome.scss";
import { SpotifyLogo } from "~atoms/spotify-logo";

export const Welcome = () => {
  const { user } = useAuth();

  const { replace } = useHistory();

  useEffect(() => {
    if (user) replace("/home");
  }, [user]);

  const onLogin = useCallback((e) => {
    e.preventDefault();
    authLogin().then(({ authorizeURL }) => {
      window.location.href = authorizeURL;
    });
  }, []);

  return (
    <>
      {/* welcome/login */}
      <main className="welcome container mt-auto mb-auto">
        <div className="welcome__logo">
          <SpotifyLogo />
          <span>🎙️</span>
        </div>

        <h1 className="mb-4">Welcome at Spotify podcast feed</h1>

        <p>
          After login you will see list of new episodes of your followed shows.
          No user data are stored. You can check it or contribute on{" "}
          <a
            href="//github.com/bycaldr/spotify-podcast-feed"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </p>
        <p>
          This app was built as a weekend project. There is no ambition to
          replace Spotify application.
        </p>

        <a href="#" className="btn mt-4" onClick={onLogin}>
          Login
        </a>
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};
