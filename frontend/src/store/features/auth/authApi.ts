import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginCredentials, RootState, SignupCredentials } from '../../store';
import { UserDetails } from '@/types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth',
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
}),
endpoints: (builder) => ({
    login: builder.mutation<UserDetails, LoginCredentials>({
        query: (credentials) => ({
            url: 'login',
            method: 'POST',
            body: credentials,
        }),
    }),
    signup: builder.mutation<UserDetails, SignupCredentials>({
        query: (credentials) => ({
            url: 'signup',
            method: 'POST',
            body: credentials,
        }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;