// stores/authStore.ts
import { create } from "zustand";
import {
  saveToken,
  getToken,
  removeToken,
  saveRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  saveUserRole,
  getUserRole,
  removeUserRole,
} from "../utils/storage";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (access: string, refresh: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  loadTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  role: null,
  isLoggedIn: false,

  login: async (access, refresh, role = "user") => {
    await saveToken(access);
    await saveRefreshToken(refresh);
    await saveUserRole(role);
    set({ accessToken: access, refreshToken: refresh, role, isLoggedIn: true });
  },

  logout: async () => {
    await removeToken();
    await removeRefreshToken();
    await removeUserRole();
    set({ accessToken: null, refreshToken: null, role: null, isLoggedIn: false });
  },

  loadTokens: async () => {
    const access = await getToken();
    const refresh = await getRefreshToken();
    const role = await getUserRole();
    if (access && refresh) {
      set({ accessToken: access, refreshToken: refresh, role, isLoggedIn: true });
    }
  },
}));
