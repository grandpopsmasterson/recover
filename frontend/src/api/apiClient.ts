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
});

// Create API client for authenticated requests
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            headers: config.headers
        });
    }

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token; // token already includes 'Bearer '
    }
    return config;
};

// Response interceptor
const responseInterceptor = (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data
        });
    }
    return response;
};

// // Error interceptor
// const errorInterceptor = (error: AxiosError<ApiError>) => {
//     if (error.response?.status === 401) {
//         // Only remove token and redirect if we're not already on the login page
//         if (!window.location.pathname.includes('/login')) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//         }
//     }

//     if (process.env.NODE_ENV === 'development') {
//         console.error('API Error:', {
//             status: error.response?.status,
//             message: error.response?.data?.message,
//             url: error.config?.url
//         });
//     }

//     return Promise.reject(error);
// };

// Apply interceptors to both clients
[authClient, apiClient].forEach(client => {
    client.interceptors.request.use(requestInterceptor);
    client.interceptors.response.use(responseInterceptor);
});













// Example usage with error handling:
/*
try {
    const data = await apiClient.post('/your-endpoint', payload);
} catch (error) {
    const apiError = error as ApiErrorType;
    // Handle error based on status code or message
    if (apiError.status === 400) {
        // Handle validation errors
        console.log(apiError.errors);
    }
}
*/