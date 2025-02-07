import { LoginCredentials, LoginResponse } from "@/types/login";
import apiClient, { authClient } from "./apiClient";


export const loginApi = {
    async login(credentials: LoginCredentials) {
        try {
            console.log("sending credentials: ", {
                url: '/Auth/Login',
                payload: credentials,
                headers: authClient.defaults.headers
            });
            const response = await authClient.post<LoginResponse>('/Auth/Login', credentials);
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