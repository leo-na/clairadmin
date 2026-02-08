import { useCallback } from "react";
import { authConfig } from "./auth.config";
import { useUserStore, type User } from "../store/user.store";
import { loginApi } from "../services/auth.api";

type StoredAuth = {
  user: User;
  token?: string;
};

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useUserStore();

  const restore = useCallback(() => {
    try {
      const raw = localStorage.getItem(authConfig.storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw) as StoredAuth;

      if (parsed?.user?.id && parsed?.user?.email) {
        login(parsed.user);
      }
    } catch {
      // ignore
    }
  }, [login]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { token, user: apiUser } = await loginApi(email, password);

      // 1) store zustand
      login(apiUser);

      // 2) localStorage (1 seule clé, comme ton restore)
      localStorage.setItem(
        authConfig.storageKey,
        JSON.stringify({ user: apiUser, token })
      );

      return apiUser;
    },
    [login]
  );

  const signOut = useCallback(() => {
    logout();
    localStorage.removeItem(authConfig.storageKey);
  }, [logout]);

  return { user, isAuthenticated, restore, signIn, signOut };
}
