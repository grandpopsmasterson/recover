import { LoginCredentials, LoginResponse } from "@/types/login";
import { authClient } from "../clients";
import { SignupRequest, SignupResponse } from "@/types/signup";
import axios from "axios";

export const loginApi = {
    async login(credentials: LoginCredentials) {
        try {
            const response = await authClient.post<LoginResponse>('/auth/login', credentials);
            
            // Extract token from response body
            const { token } = response.data;
            if (token) {
                localStorage.setItem(`token`, `Bearer ${token}`);
            }
            
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('LOGIN FAILED: ', {
                    status: error.response?.status,
                    data: error.response?.data
                });
            }
            throw error;
        }
    }
};

export const signupApi = {
    async signup(signupData: SignupRequest) {
        try {
            const response = await authClient.post<SignupResponse>('/auth/signup', signupData);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Signup failed:', {
                    status: error.response?.status,
                    data: error.response?.data
                });
            }
            throw error;
        }
    }
};

export const logoutApi = {
    async logout() {
        try {
            await authClient.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return true;
        } catch (error) {
            console.error('Logout failed', error);
            // Clean up local storage even if server logout fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error;
        }
    }
};