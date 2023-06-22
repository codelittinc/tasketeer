import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { REACT_APP_API_URL } from 'env';
import SessionService from '../services/session.service';

const apiClient = axios.create({
  baseURL: REACT_APP_API_URL,
});

apiClient.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  const token = SessionService.getAccessToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      SessionService.removeCachedUser();
      SessionService.removeCachedAccessToken();
    }
    throw error;
  },
);

export default apiClient;
