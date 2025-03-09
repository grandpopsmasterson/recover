// import { GroupedProjects, GroupedProjectState, Project } from "@/types/project";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getGroupedProjectsThunk, getMultiQueryThunk } from "../thunk/groupedProjectThunk";

// const initialState: GroupedProjectState = {
//     groupedProjects: [],
//     loading: false,
//     error: null,
// }

// const groupedProjectSlice = createSlice({
//     name: 'groupedProjects',
//     initialState,
//     reducers: {
//         // Add any synchronous reducers if needed
//     },
//     extraReducers: (builder) => {
//         builder
//         // Grouped projects thunk
//         .addCase(getGroupedProjectsThunk.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(getGroupedProjectsThunk.fulfilled, (state, action: PayloadAction<GroupedProjects[]>) => {
//             state.loading = false;
//             state.groupedProjects = action.payload;
//         })
//         .addCase(getGroupedProjectsThunk.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string;
//         })
        
//         // Multi-query thunk - also updates groupedProjects
//         .addCase(getMultiQueryThunk.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(getMultiQueryThunk.fulfilled, (state, action: PayloadAction<Project[]>) => {
//             state.loading = false;
//             // Transform Project[] to a single GroupedProjects entry
//             state.groupedProjects = [{
//                 groupKey: 'search_results',
//                 count: action.payload.length,
//                 projects: action.payload
//             }];
//         })
//         .addCase(getMultiQueryThunk.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload as string; 
//         })
//     }
// });

// export default groupedProjectSlice.reducer;