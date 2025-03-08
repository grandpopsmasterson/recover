import { GroupedProjects, ShortProject, LongProject, ProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEstimatesThunk, fetchFlagsThunk, fetchProjectsThunk, fetchTimelineThunk, fetchWorkOrdersThunk, updateProjectThunk } from "../thunk/projectThunk";

const initialState: ProjectState = {
  projects: [] as LongProject[],
  currentProject: null as LongProject | null,
  loading: false,
  error: null,
  overview: {
    data: null,
    loading: false,
    error: null
  },
  estimates: {
    data: [],
    loading: false,
    error: null
  },
  workOrders: {
    data: [],
    loading: false,
    error: null
  },
  timeline: {
    data: [],
    loading: false,
    error: null
  },
  flags: {
    data: [],
    loading: false,
    error: null
  }
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      setCurrentProject: (state, action: PayloadAction<bigint | null>) => {
        state.currentProject = state.projects.find((p) => p.id === action.payload) 
      ? { ...state.projects.find((p) => p.id === action.payload)} as LongProject 
      : null;
      },
      clearProjectOverview: (state) => {
        state.overview = {
          data: null,
          loading: false,
          error: null
        };
      }
    },
    extraReducers: (builder) => {
      builder
        // fetchProjects
        .addCase(fetchProjectsThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProjectsThunk.fulfilled, (state, action: PayloadAction<ShortProject[]>) => {
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

        // Estimate Reducers
        .addCase(fetchEstimatesThunk.pending, (state) => {
          state.estimates.loading = true;
          state.estimates.error = null;
        })
        .addCase(fetchEstimatesThunk.fulfilled, (state, action) => {
          state.estimates.loading = false;
          state.estimates.data = action.payload;
        })
        .addCase(fetchEstimatesThunk.rejected, (state, action) => {
          state.estimates.loading = false;
          state.estimates.error = action.payload as string;
        })
        
        // Work Orders Reducers
        .addCase(fetchWorkOrdersThunk.pending, (state) => {
          state.workOrders.loading = true;
          state.workOrders.error = null;
        })
        .addCase(fetchWorkOrdersThunk.fulfilled, (state, action) => {
          state.workOrders.loading = false;
          state.workOrders.data = action.payload;
        })
        .addCase(fetchWorkOrdersThunk.rejected, (state, action) => {
          state.workOrders.loading = false;
          state.workOrders.error = action.payload as string;
        })

        // Timeline Reducers
        .addCase(fetchTimelineThunk.pending, (state) => {
          state.timeline.loading = true;
          state.timeline.error = null;
        })
        .addCase(fetchTimelineThunk.fulfilled, (state, action) => {
          state.timeline.loading = false;
          state.timeline.data = action.payload;
        })
        .addCase(fetchTimelineThunk.rejected, (state, action) => {
          state.timeline.loading = false;
          state.timeline.error = action.payload as string;
        })
        
        // Flag Reducers
        .addCase(fetchFlagsThunk.pending, (state) => {
          state.flags.loading = true;
          state.flags.error = null;
        })
        .addCase(fetchFlagsThunk.fulfilled, (state, action) => {
          state.flags.loading = false;
          state.flags.data = action.payload;
        })
        .addCase(fetchFlagsThunk.rejected, (state, action) => {
          state.flags.loading = false;
          state.flags.error = action.payload as string;
        })
    },
  });

  export const { setCurrentProject, clearProjectOverview } = projectsSlice.actions;
  export default projectsSlice.reducer; 