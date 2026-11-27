import { API, setAccessToken, getAccessToken, refreshAccessToken } from './api';

export const handleApiError = (error) => {
  const message =
    error?.response?.data?.message || error.message || 'Something went wrong';
     
    const customError=new Error(message)
    customError.status=error?.response?.status
    throw customError
};

export const register = async (data) => {
  try {
    const res = await API.post('/auth/register', data);
    const token = res.data?.accessToken || res.data?.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    if (res.data?.refreshToken) {
      localStorage.setItem('refreshToken', res.data.refreshToken);
    }
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const login = async (data) => {
  try {
    const res = await API.post('/auth/login', data);
    const token = res.data?.accessToken || res.data?.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    if (res.data?.refreshToken) {
      localStorage.setItem('refreshToken', res.data.refreshToken);
    }
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyUser = async () => {
  try {
    if (!getAccessToken()) {
      await refreshAccessToken().catch(() => null);
    }

    if (!getAccessToken()) {
      return null;
    }

    const res = await API.get('/auth/verify-user');
    return res.data;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const res = await API.post('/auth/logout', savedRefreshToken ? { refreshToken: savedRefreshToken } : {});
    return res.data;
  } catch (error) {
    handleApiError(error);
  } finally {
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
  }
};

export const rotateRefreshToken = async () => {
  try {
    return await refreshAccessToken();
  } catch (error) {
    handleApiError(error);
  }
};
