import { GroupedProjects, GroupedProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGroupedProjectsThunk, getMultiQueryThunk } from "../thunk/groupedProjectThunk";

const initialState: GroupedProjectState = {
    groupedProjects: [],
    loading: false,
    error: null,
}

const groupedProjectSlice = createSlice({
    name: 'groupedProjects',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // grouped projects
        .addCase(getGroupedProjectsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getGroupedProjectsThunk.fulfilled, (state, action: PayloadAction<GroupedProjects[]>) => {
            state.loading = false;
            state.groupedProjects = action.payload;
        })
        .addCase(getGroupedProjectsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getMultiQueryThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMultiQueryThunk.fulfilled, (state, action: PayloadAction<GroupedProjects[]>) => {
            state.loading = false;
            state.groupedProjects = action.payload;
        })
        .addCase(getMultiQueryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
        })
    }
});

export const {} = groupedProjectSlice.actions;
export default groupedProjectSlice.reducer;