import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
