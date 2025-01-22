// Filename: apiClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true, // Automatically sends cookies with requests
});

apiClient.interceptors.request.use((config) => {
  console.log("Request Headers:", config.headers); // Log headers
  return config;
});


// Add response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error; // Re-throw for individual request handling
  }
);

export default apiClient;
