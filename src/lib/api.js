
import axios from "axios";
import { authClient } from "./auth-client";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

// Cache the token briefly to avoid re-fetching it on every single request burst.
let cachedToken = null;
let cachedAt = 0;
const TOKEN_TTL_MS = 60 * 1000; // 1 minute

async function getFreshToken() {
  const now = Date.now();
  if (cachedToken && now - cachedAt < TOKEN_TTL_MS) {
    return cachedToken;
  }
  try {
    const { data } = await authClient.$fetch("/token");
    cachedToken = data?.token || null;
    cachedAt = now;
    return cachedToken;
  } catch (err) {
    cachedToken = null;
    return null;
  }
}

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getFreshToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const clearTokenCache = () => {
  cachedToken = null;
  cachedAt = 0;
};

export default axiosInstance;