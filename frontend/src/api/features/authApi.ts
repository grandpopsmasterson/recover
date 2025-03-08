import { apiService } from '@/api/service/apiService';
import { LoginCredentials, LoginResponse } from "@/types/login";
import { SignupRequest, SignupResponse } from "@/types/signup";
import TokenManager from '@/api/utils/token';

export const authApi = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            // With our improved apiService, this will correctly extract the response
            // regardless of whether it's nested or not
            const response = await apiService.post<LoginResponse>('/auth/login', credentials);
            
            // Log the response for debugging
            console.log('Login response:', response);
            
            // Check if we have a token in the response
            if (response && response.token) {
                // Store the token
                TokenManager.setToken(response.token);
                return response;
            } else {
                console.error('No token found in response:', response);
                throw new Error('Authentication failed: No token received');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async signup(payload: SignupRequest): Promise<SignupResponse> {
        return apiService.post<SignupResponse>('/auth/signup', payload);
    },

    async checkEmailAvailability(email: string): Promise<boolean> {
        const response = await apiService.post<{ available: boolean }>('/auth/check-email', { email });
        return response.available;
    },

    async checkUsernameAvailability(username: string): Promise<boolean> {
        const response = await apiService.post<{ available: boolean }>('/auth/check-username', { username });
        return response.available;
    },

    async logout(): Promise<void> {
        try {
        await apiService.post('/auth/logout', {});
        } finally {
        TokenManager.clearAuth();
        localStorage.removeItem('user');
        }
    }
};