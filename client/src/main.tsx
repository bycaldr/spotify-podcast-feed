import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { routes } from "~routes";
import "~utils/sentry";

import "bootstrap/dist/css/bootstrap-grid.css";
import "./styles/base.scss";

dayjs.extend(localizedFormat);

export const Main = () => {
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
};
