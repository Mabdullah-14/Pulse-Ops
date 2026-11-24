import axios from 'axios';

let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};
export const getAccessToken = () => accessToken;

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

export const refreshAccessToken = () => {
  if (!refreshPromise) {
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const payload = savedRefreshToken ? { refreshToken: savedRefreshToken } : {};

    refreshPromise = API.post('/auth/refresh-token', payload)
      .then((res) => {
        const token = res.data?.accessToken || res.data?.data?.accessToken;
        setAccessToken(token);
        if (res.data?.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
        return token;
      })
      .catch((err) => {
        setAccessToken(null);
        localStorage.removeItem('refreshToken');
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    const skip =
      !request ||
      request.url?.includes('/auth/login') ||
      request.url?.includes('/auth/register') ||
      request.url?.includes('/auth/refresh-token') ||
      request.url?.includes('/auth/logout');

    if (error.response?.status === 401 && !request._retry && !skip) {
      request._retry = true;
      try {
        const newToken = await refreshAccessToken();
        request.headers.Authorization = `Bearer ${newToken}`;
        return API(request);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
