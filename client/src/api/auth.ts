import { apiClient } from "./client";

export const authMe = async () => {
  const { data } = await apiClient.request({
    method: "GET",
    url: "/auth/me",
  });
  return data;
};

type AuthLoginResponse = {
  authorizeURL: string;
};

export const authLogin = async () => {
  const { data } = await apiClient.request<AuthLoginResponse>({
    method: "GET",
    url: "/auth/login",
  });
  return data;
};

type User = {};

type AuthCallbackResponse = {
  token: string;
  user: User;
};
export const authCallback = async (code: string) => {
  const { data } = await apiClient.request<AuthCallbackResponse>({
    method: "GET",
    url: "/auth/callback",
    params: { code },
  });
  return data;
};

export const authLogout = async () => {
  const { data } = await apiClient.request({
    method: "POST",
    url: "/auth/logout",
  });
  return data;
};
