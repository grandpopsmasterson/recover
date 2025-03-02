import { LoginCredentials, LoginResponse } from "@/types/login";
import { authClient } from "../clients";
import { SignupRequest, SignupResponse } from "@/types/signup";
import axios from "axios";
import { ErrorCode } from "@/types/api";
import { getLoginErrorMessage } from "../utils/error";

export const loginApi = {
    async login(payload: LoginCredentials) {
        try {
            const response = await authClient.post<LoginResponse>('/auth/login', payload);
            
            const token = response.data.token;
            if (token) {
                localStorage.setItem(`token`, `${token}`);
            }
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status as ErrorCode;
                const errorMessage = getLoginErrorMessage(statusCode);
                throw new Error(errorMessage);
            }
            throw Error;
        }
    }
};

export const signupApi = {
    async signup(payload: SignupRequest) {
        try {
            const response = await authClient.post<SignupResponse>('/auth/signup', payload);
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
    },
    async checkEmailAvailability(email: string) {
        try {
            const response = await authClient.post<{ available: boolean }>('/auth/check-email', { email });
            return response.data.available;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Email check failed:', {
                    status: error.response?.status,
                    data: error.response?.data
                });
            }
            throw error;
        }
    },
    async checkUsernameAvailability(username: string) {
        try {
            const response = await authClient.post<{ available: boolean }>(`/auth/check-username/`, { username });
            return response.data.available;
        } catch (error) {
            if (axios.isAxiosError(error)) {
            console.error('Username check failed:', {
                status: error.response?.status,
                data: error.response?.data
                });
            }
            throw error;
        }
    },
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