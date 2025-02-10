import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Type for API error response
interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

// Create auth client for authentication endpoints (login/signup)
export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Add this to ensure cookies are sent
});

// Create API client for authenticated requests
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Add this to ensure cookies are sent
});

// Error handling interceptor
const errorInterceptor = (error: AxiosError) => {
    console.error('Axios Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers,
        url: error.config?.url,
    });

    // Detailed network error logging
    if (error.code === 'ERR_NETWORK') {
        console.error('Network Error Details:', {
            baseURL: error.config?.baseURL,
            url: error.config?.url,
            method: error.config?.method,
            connectTimeout: error.config?.timeout,
        });
    }

    // Specific error handling for different error types
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
            case 400:
                console.error('Bad Request:', error.response.data);
                break;
            case 401:
                // Handle unauthorized access (e.g., redirect to login)
                console.error('Unauthorized Access');
                break;
            case 403:
                console.error('Forbidden Access');
                break;
            case 404:
                console.error('Resource Not Found');
                break;
            case 500:
                console.error('Internal Server Error');
                break;
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
};

// Request interceptor
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    // Add additional diagnostics
    console.log('Full Request Config:', {
        baseURL: config.baseURL,
        url: config.url,
        method: config.method?.toUpperCase(),
        headers: config.headers,
        params: config.params,
    });

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }

    // Ensure absolute URL is used
    if (config.baseURL && config.url) {
        config.url = new URL(config.url, config.baseURL).toString();
    }

    return config;
};

// Response interceptor
const responseInterceptor = (response: AxiosResponse) => {
    console.log('Full Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        headers: response.headers,
        data: response.data
    });
    return response;
};

// Add interceptors
authClient.interceptors.request.use(requestInterceptor);
authClient.interceptors.response.use(responseInterceptor, errorInterceptor);

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

// Global axios configuration
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.timeoutErrorMessage = 'Request timed out';
