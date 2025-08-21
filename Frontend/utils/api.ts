// utils/api.ts
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { getToken, getRefreshToken, saveToken } from "./storage";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token
api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().accessToken || (await getToken());
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = useAuthStore.getState().refreshToken || (await getRefreshToken());
      if (refresh) {
        try {
          const res = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, { refresh });
          const newAccess = res.data.access;
          await saveToken(newAccess);
          useAuthStore.setState({ accessToken: newAccess });
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch {
          useAuthStore.getState().logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
