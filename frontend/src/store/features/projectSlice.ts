import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
      projects: [],
      currentProject: null,
      loading: false,
      error: null
    },
    reducers: {
      setProjects: (state, action) => {
        state.projects = action.payload;
      },
      setCurrentProject: (state, action) => {
        state.currentProject = action.payload;
      },
      startLoading: (state) => {
        state.loading = true;
      },
      stopLoading: (state) => {
        state.loading = false;
      }
    }
  });

  export const { setProjects, setCurrentProject, startLoading, stopLoading } = projectsSlice.actions;

  // Export the reducer
  export default projectsSlice.reducer; 