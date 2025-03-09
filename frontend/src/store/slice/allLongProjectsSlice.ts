import { AllLongProjectState, LongProject } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMultiQueryThunk } from "../thunk/groupedProjectThunk";

const initialState: AllLongProjectState = {
    longProject: [],
    loading: false,
    error: null,
}

const allLongProjectSlice = createSlice({
    name: 'allLongProjects',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // MultiQueryThunk - also updates groupedProjects?
            .addCase(getMultiQueryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMultiQueryThunk.fulfilled, (state, action: PayloadAction<LongProject[]>) => {
                state.longProject = action.payload;
                state.loading = false;
            })
            .addCase(getMultiQueryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { } = allLongProjectSlice.actions;
export default allLongProjectSlice.reducer;