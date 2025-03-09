import { configureStore } from '@reduxjs/toolkit';
import { 
  useDispatch, 
  useSelector, 
  type TypedUseSelectorHook 
} from 'react-redux';

// Import all reducers
import projectReducer from './slice/projectSlice';
import authReducer from './slice/authSlice';
import longProjectReducer from './slice/longProjectSlice'
import allLongProjectsReducer from './slice/allLongProjectsSlice'
// import userReducer from './slice/userSlice';
// import groupedProjectReducer from './slice/groupedProjectSlice';

// Create the store
export const store = configureStore({
  reducer: {
    projects: projectReducer,
    auth: authReducer,
    longProject: longProjectReducer,//single long project
    allLongProjects: allLongProjectsReducer, // multiple long projects (filter usage on ridgeline)
    // user: userReducer,
    // groupedProject: groupedProjectReducer,
  },
  
  // Middleware configuration
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions and paths that might contain non-serializable data
        ignoredActions: [
          'projects/fetchProjectDetails/pending',
          'projects/fetchProjectDetails/fulfilled',
          'projects/fetchProjectDetails/rejected'
        ],
        ignoredPaths: [
          'projects.overview.data',
          'projects.currentProject'
        ]
      }
    }),

  // Enable Redux DevTools only in development
  devTools: process.env.NODE_ENV !== 'production'
});

// Type definitions for the root state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for using dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Optional: Selector functions for common state selections
export const selectProjectState = (state: RootState) => state.projects;
export const selectAuthState = (state: RootState) => state.auth;
// export const selectUserState = (state: RootState) => state.user;
// export const selectGroupedProjectState = (state: RootState) => state.groupedProject;