
// to work on both web and mobile

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ROLE_KEY = "user_role";

// ----------------- Access token -----------------
export const saveToken = async (token: string) => {
  if (isWeb) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  }
};

export const getToken = async () => {
  if (isWeb) {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const removeToken = async () => {
  if (isWeb) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  }
};

// ----------------- Refresh token -----------------
export const saveRefreshToken = async (token: string) => {
  if (isWeb) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  }
};

export const getRefreshToken = async () => {
  if (isWeb) {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = async () => {
  if (isWeb) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
};

// ----------------- User role -----------------
export const saveUserRole = async (role: string) => {
  if (isWeb) {
    localStorage.setItem(USER_ROLE_KEY, role);
  } else {
    await SecureStore.setItemAsync(USER_ROLE_KEY, role);
  }
};

export const getUserRole = async () => {
  if (isWeb) {
    return localStorage.getItem(USER_ROLE_KEY);
  }
  return await SecureStore.getItemAsync(USER_ROLE_KEY);
};

export const removeUserRole = async () => {
  if (isWeb) {
    localStorage.removeItem(USER_ROLE_KEY);
  } else {
    await SecureStore.deleteItemAsync(USER_ROLE_KEY);
  }
};
