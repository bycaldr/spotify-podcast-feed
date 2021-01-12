import React from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import { AuthProvider } from "~utils/auth/auth-provider";
import { ErrorBoundary } from "~utils/error-boundary";

import "./root.scss";

type Props = {} & RouteConfigComponentProps;

export const Root = ({ route }: Props) => {
  const content = renderRoutes(route.routes);

  return (
    <div className="root">
      <ErrorBoundary>
        <AuthProvider>{content}</AuthProvider>
      </ErrorBoundary>
    </div>
  );
};
