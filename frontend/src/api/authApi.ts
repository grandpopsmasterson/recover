import { LoginCredentials, LoginResponse } from "@/types/login";
import { authClient } from "./apiClient";
import { SignupRequest, SignupResponse } from "@/types/signup";
import axios from "axios";


export const loginApi = {
    async login(credentials: LoginCredentials) {
        try {
            console.log("sending credentials: ", {
                url: '/Auth/Login',
                payload: credentials,
                headers: authClient.defaults.headers
            });
            const response = await authClient.post<LoginResponse>('/auth/login', credentials);
            return response;
        } catch (error: any) {
            console.log('LOGIN FAILED: ', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            });
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}

export const signupApi = {
    async signup (signupData: SignupRequest){
        try {
            console.log('attempting signup with data', signupData);
            console.log('API URL: ', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`);

            return authClient.post('/auth/signup', signupData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Signup failed:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    config: {
                        url: error.config?.url,
                        baseURL: error.config?.baseURL,
                        headers: error.config?.headers
                    }
                });
            }
            throw error;
        }
        
    }
}

export const logoutApi = {
    async logout() {
      try {
        // Backend endpoint to invalidate token and clear server-side session
        const response = await authClient.post('/auth/logout');
        
        // Clear local state or redirect
        return response;
      } catch (error) {
        console.error('Logout failed', error);
        throw error;
      }
    }
};