/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/api/clients';
import { UserState } from '@/types/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

export const fetchUserThunk = createAsyncThunk<User, void>(
    "user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/user???");
            if (!response) {
                throw new Error('failed to fetch user');
            };
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;