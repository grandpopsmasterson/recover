import { GroupedProjects, LongProject, ProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjectsThunk, updateProjectThunk } from "../thunk/projectThunk";

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      setCurrentProject: (state, action: PayloadAction<number | null>) => {
        state.currentProject = state.projects.find((p) => p.id === action.payload) || null;
      },
    },
    extraReducers: (builder) => {
      builder
        // fetchProjects
        .addCase(fetchProjectsThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProjectsThunk.fulfilled, (state, action: PayloadAction<LongProject[]>) => {
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
        .addCase(updateProjectThunk.fulfilled, (state, action: PayloadAction<LongProject>) => {
          const index = state.projects.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        })
        .addCase(updateProjectThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        
    },
  });

  export const { setCurrentProject } = projectsSlice.actions;
  export default projectsSlice.reducer; 