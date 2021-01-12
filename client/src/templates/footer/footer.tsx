import React from "react";

import "./footer.scss";

export const Footer = () => {
  return (
    <footer className="footer container d-flex justify-content-center pt-4 pb-4">
      <span>Made with 💚 by</span>
      &nbsp;
      <a href="https://bycaldr.cz" target="_blank" rel="noopener noreferrer">
        Lukas Caldr
      </a>
    </footer>
  );
};
