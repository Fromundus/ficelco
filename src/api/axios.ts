import apiBaseUrl from '@/apiBaseUrl';
import axios from 'axios';

const api = axios.create({
  baseURL: `${apiBaseUrl}`,
  withCredentials: true,        // crucial — includes cookies
  withXSRFToken: true,
});

// helper to get CSRF cookie
export const getCsrf = () => api.get('/sanctum/csrf-cookie');

export default api;
