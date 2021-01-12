import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { authLogout } from "~api";

import { AuthContext } from "./auth-context";

export const useAuth = () => {
  const user = useContext(AuthContext);
  const { replace } = useHistory();

  const logout = useCallback(async () => {
    await authLogout();
    window.location.href = '/'
  }, [replace]);

  return { user, logout };
};
