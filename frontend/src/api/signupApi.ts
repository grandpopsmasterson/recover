import { SignupRequest, SignupResponse } from '@/types/signup';
import { authClient } from './apiClient';
import axios from 'axios';


const signupApi = {
    signup: async (signupData: SignupRequest): Promise<SignupResponse> => {
        try {
            console.log('attempting signup with data', signupData);
            console.log('API URL: ', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/SignUp`);

            return authClient.post('/api/Auth/SignUp', signupData);
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
};

export default signupApi;