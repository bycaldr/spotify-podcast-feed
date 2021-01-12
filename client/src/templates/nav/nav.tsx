import React, { useContext, useState } from "react";
import clsx from "clsx";

import { useAuth } from "~utils/auth";

import { Arrow } from "~atoms/arrow";

import "./nav.scss";

export const Nav = () => {
  const { user, logout } = useAuth();
  const { display_name, images } = user;

  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <nav className="nav container d-flex justify-content-end pt-3 pb-1">
      {/* profile */}
      <div
        className="nav__profile d-flex align-items-center"
        onMouseEnter={() => setProfileMenu(true)}
        onMouseLeave={() => setProfileMenu(false)}
      >
        {/* profile content */}
        <img src={images[0].url} height={32} className="mr-2" />
        <span>{display_name}</span>
        <Arrow orientation={profileMenu ? "top" : "bottom"} />

        {/* profile menu */}
        <div
          className={clsx(
            "nav__profileMenu",
            profileMenu && "nav__profileMenu--open"
          )}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
};
