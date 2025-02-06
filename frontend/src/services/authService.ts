/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { ApiResponse, EmailCheckResponse, UsernameCheckResponse } from "@/types/api";

export class AuthService {
    private static instance: AuthService;
    private api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        //response interceptor for error handlng
        this.api.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                if (error.response?.status === 400) {
                    console.log('unauthorized')
                    // TODO handle unauthorized
                }
                return Promise.reject(error);
            }
        );
    }
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async checkEmail(email: string): Promise<ApiResponse<EmailCheckResponse>> {
        try {
            const response = await this.api.post<ApiResponse<EmailCheckResponse>>('/auth/check-email', { email });
            return response.data;
        } catch (error : any) {
            throw this.handleError(error);
        }
    }

    async checkUsername(username: string): Promise<ApiResponse<UsernameCheckResponse>> {
        try {
            const response = await this.api.post<ApiResponse<UsernameCheckResponse>>('/auth/check-username', { username });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            return new Error(error.response?.data?.message || 'An error occurred');
        }
        return new Error('An unexpected error occurred');
    }
}