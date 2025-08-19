// utils/storage.ts
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ROLE_KEY = "user_role";

// Access token
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
};
export const getToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};
export const removeToken = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
};

// Refresh token
export const saveRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
};
export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};
export const removeRefreshToken = async () => {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
};

// User role
export const saveUserRole = async (role: string) => {
  await SecureStore.setItemAsync(USER_ROLE_KEY, role);
};
export const getUserRole = async () => {
  return await SecureStore.getItemAsync(USER_ROLE_KEY);
};
export const removeUserRole = async () => {
  await SecureStore.deleteItemAsync(USER_ROLE_KEY);
};
