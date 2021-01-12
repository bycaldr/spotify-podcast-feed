import React, { PropsWithChildren, useEffect, useState } from "react";
import { parse as parseQuery } from "querystring";
import { useHistory, useLocation } from "react-router-dom";

import { authCallback, authMe } from "~api";

import { AuthContext } from "./auth-context";

type Props = PropsWithChildren<{}>;

export const AuthProvider = ({ children }: Props) => {
  const { search } = useLocation();
  const { replace } = useHistory();

  const [auth, setAuth] = useState<AuthContext>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // parse query and check if callback
      const { code, state } = parseQuery(search.replace("?", ""));
      if (code) {
        try {
          const { user } = await authCallback(code as string);
          setAuth(user);
          replace("/home");
        } catch (err) {
          alert(
            "There was an error. Try to refresh page. If problem persists, contact me on caldr.l@hotmail.com"
          );
        }
      }

      // check logged user
      authMe().then(
        (me) => {
          setAuth(me);
          setLoading(false);
        },
        (err) => {
          replace("/");
          setLoading(false);
          setAuth(undefined);
        }
      );
    })();
  }, [replace]);

  return (
    <AuthContext.Provider value={auth}>
      {loading && null}
      {!loading && children}
    </AuthContext.Provider>
  );
};
