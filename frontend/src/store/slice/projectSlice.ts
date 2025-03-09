import { GroupedProjects, Project, ProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjectsThunk, updateProjectThunk } from "../thunk/projectThunk";
import { getGroupedProjectsThunk, } from "../thunk/groupedProjectThunk";

const initialState: ProjectState = {
  projects: [] as Project[],
  loading: false,
  error: null,
  groupedProject: {
    groupedProjects: [],
    loading: false,
    error: null,
  },
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        // fetchProjects
        .addCase(fetchProjectsThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProjectsThunk.fulfilled, (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.projects = action.payload;
        })
        .addCase(fetchProjectsThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // updateProject
        .addCase(updateProjectThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProjectThunk.fulfilled, (state, action: PayloadAction<Project>) => {
          state.loading = false; // Add this line
          const index = state.projects.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        })
        .addCase(updateProjectThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(getGroupedProjectsThunk.pending, (state) => {
                    state.groupedProject.loading = true;
                    state.groupedProject.error = null;
        })
        .addCase(getGroupedProjectsThunk.fulfilled, (state, action: PayloadAction<GroupedProjects[]>) => {
            state.groupedProject.loading = false;
            state.groupedProject.groupedProjects = action.payload;
        })
        .addCase(getGroupedProjectsThunk.rejected, (state, action) => {
            state.groupedProject.loading = false;
            state.groupedProject.error = action.payload as string;
        })
    },
  });

  export const { } = projectsSlice.actions;
  export default projectsSlice.reducer; 