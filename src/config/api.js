export const API_BASE_URL = "http://10.0.2.2:8082";

export const ENDPOINTS = {
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  CURRENT_USER: "/api/auth/me",
};

export function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}
