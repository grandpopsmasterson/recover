// src/lib/api/config/clients.ts
import axios from 'axios';
import { apiConfig, thirdPartyConfig } from './base';

// main api client
export const apiClient = axios.create(apiConfig);

// auth api
export const authClient = axios.create(apiConfig);

authClient.interceptors.request.use(
  config => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  error => Promise.reject(error)
);

// third party services
export const awsClient = axios.create({
  ...thirdPartyConfig,
  baseURL: process.env.NEXT_PUBLIC_AWS_ENDPOINT,
  headers: {
    ...thirdPartyConfig.headers,
    'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY,
  },
});

export const mapsClient = axios.create({
  ...thirdPartyConfig,
  baseURL: 'https://maps.googleapis.com/maps/api',
});

export const matterportClient = axios.create({
  ...thirdPartyConfig,
  baseURL: process.env.NEXT_PUBLIC_MATTERPORT_API_URL,
});
