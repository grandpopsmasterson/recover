/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const requestInterceptor = (config:  any) => {
    console.log('Request: ', config.method?.toUpperCase(), config.url);
    console.log('Full url: ', config.baseURL + config.url )
    return config
};

const requestErrorHandler = (error: any) => {
    console.error('Request error: ', error);
    return Promise.reject(error);
};


const responseInterceptor = (response: any) => {
    console.log('Response: ', response.status, response.config.url);
    return response.data;
};

const responseErrorHandler = (error: any) => {
    console.error('Response.error: ', error.response?.status, error.response?.data);
    return Promise.reject(error);
}; 

[authClient, apiClient].forEach(client => {
    client.interceptors.request.use(requestInterceptor, requestErrorHandler);
    client.interceptors.response.use(responseInterceptor, responseErrorHandler);
})

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        console.log('Request:', config.method?.toUpperCase(), config.url);
        // Modify or add authentication headers if needed
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response.data; // Extract only the data
    },
    (error) => {
        console.error('Response error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);


