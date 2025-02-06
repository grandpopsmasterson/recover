// import signupReducer from './slices/auth/signupSlice'

// export const store = configureStore({
//     reducer: {
//         signup: signupReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserDetails } from '@/types/auth';
import { combineReducers } from '@reduxjs/toolkit';
import { projectApi } from '@/api/projects-api';

interface AuthState {
  user: UserDetails | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {error: string | null}; //TODO
export interface SignupCredentials {error: string | null}; //TODO

export const logout = createAsyncThunk(
  'auth/logout',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    
    // Additional cleanup
  }
);

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

const projectSlice = createSlice({ //TODO ALL PROJ FILES ORE AUTH COPIES
  name: 'project',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

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

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
  ui: uiSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      projectApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


