import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slice/projectSlice';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import groupedProjectReducer from './slice/groupedProjectSlice'

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    auth: authReducer,
    user: userReducer,
    groupedProject: groupedProjectReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
