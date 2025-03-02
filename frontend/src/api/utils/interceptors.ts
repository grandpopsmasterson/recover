// import { InternalAxiosRequestConfig } from 'axios';
// import { AxiosError } from 'axios';

// // src/api/utils/interceptors/auth
// export const authInterceptor = (config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// };

// // src/api/utils/interceptors/error
// export const createErrorHandler = (serviceName: string) => {
//   return (error: AxiosError) => {
//     // Error handling logic...
//     return Promise.reject(error);
//   };
// };

// // src/lib/api/interceptors/logging
// export const createRequestLogger = (serviceName: string) => {
//   return (config: InternalAxiosRequestConfig) => {
//     console.log(`[${serviceName}] Request:`, {
//       url: config.url,
//       method: config.method?.toUpperCase(),
//     });
//     return config;
//   };
// };