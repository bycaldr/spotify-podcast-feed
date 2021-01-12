import { RouteConfig } from "react-router-config";

import { Root } from "./templates/root";

import { Home } from "./pages/home";
import { Welcome } from "./pages/welcome";

export const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Welcome,
      },
      {
        path: "/home",
        exact: true,
        component: Home,
      },
    ],
  },
];
