import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import TokenManager from "./utils/token"

const EXCLUDED_PATHS = ['auth/login', 'auth/signup', '/'];
  
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = TokenManager.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const data = error.response?.data as any;
      
      if ((status === 401 || status === 403 || status === 500) && data) {
        const isTokenError = 
          data.exception?.includes('JWT') || 
          data.exception?.includes('Nil JSON web token') ||
          data.error?.includes('expired') ||
          /token|expired|invalid/i.test(data.message || '');
        
        if (isTokenError) {
          TokenManager.clearAuth();
          localStorage.setItem('auth_alert', 'Your session has expired or failed. Please log in again.');
          
          const currentPath = window.location.pathname;
          const isExcludedPath = EXCLUDED_PATHS.some(path => 
            currentPath === path || currentPath.startsWith(`${path}/`)
          );
          
          if (!isExcludedPath) {
            window.location.href = '/auth/login';
          }
          
          return Promise.reject(error);
        }
  
        if (status === 401 && !isTokenError) {
          try {
            await TokenManager.refreshToken();
            return instance(error.config!);
          } catch {
            TokenManager.clearAuth();
            window.location.href = '/auth/login';
          }
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  return instance;
};

export const apiClient = createAxiosInstance(
  process.env.NEXT_PUBLIC_API_BASE_URL || '/api'
);