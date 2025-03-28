import { createAsync, query, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { getRequestEvent } from "solid-js/web";

import { signOut } from "~/lib/auth_client";
import {
  useIsAuthenticated,
  useSetIsAuthenticated,
} from "~/store/auth/authStore";

const checkAuthenticated = query(async () => {
  "use server";
  const isAuthenticated = getRequestEvent();
  return { isAuthenticated: isAuthenticated?.locals?.isAuthenticated };
}, "checkAuthenticated");

export const useHeader = () => {
  const setIsAuthenticated = useSetIsAuthenticated();
  const isAuthServer = createAsync(() => checkAuthenticated());

  createEffect(() => {
    if (isAuthServer()?.isAuthenticated) {
      setIsAuthenticated(true);
    }
  });

  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          document.cookie =
            "AUTH=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          navigate("/auth/login");
          setIsAuthenticated(false);
        },
        onError: () => {
          console.log("error");
        },
      },
    });
  };

  return {
    isAuth,
    handleLogout,
  };
};
