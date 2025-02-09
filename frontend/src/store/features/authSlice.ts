import { UserDetails } from '@/types/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface AuthState {
    user: UserDetails | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        localStorage.removeItem('token');
        // Additional cleanup
    }
);

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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;