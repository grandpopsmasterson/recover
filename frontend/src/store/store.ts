import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/projectSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
