import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set this in your .env file
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export default apiClient;
