import { AxiosRequestConfig } from 'axios';
import { apiClient } from '../axios';
import { ApiResponse, PaginatedResponse } from "@/api/utils/response";

export const apiService = {
    /**
     * Make a GET request
     */
    async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.get(url, { 
            params, 
            ...config 
        });
        
        // Handle both nested and direct response formats
        return response.data && typeof response.data === 'object' && 'data' in response.data 
            ? response.data.data 
            : response.data;
    },

    /**
     * Make a POST request
     */
    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.post(url, data, config);
        
        // Handle both nested and direct response formats
        return response.data && typeof response.data === 'object' && 'data' in response.data 
            ? response.data.data 
            : response.data;
    },

    /**
     * Make a PUT request
     */
    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.put(url, data, config);
        
        // Handle both nested and direct response formats
        return response.data && typeof response.data === 'object' && 'data' in response.data 
            ? response.data.data 
            : response.data;
    },

    /**
     * Make a DELETE request
     */
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.delete(url, config);
        
        // Handle both nested and direct response formats
        return response.data && typeof response.data === 'object' && 'data' in response.data 
            ? response.data.data 
            : response.data;
    },

    /**
     * Make a GET request that returns paginated data
     */
    async getPaginated<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> {
        const response = await apiClient.get(url, { 
            params, 
            ...config 
        });
        
        // For paginated responses, we expect the specific PaginatedResponse format
        return response.data;
    }
};