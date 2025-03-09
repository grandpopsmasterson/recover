import { GroupedProjects, GroupedProjectState, Project, Project, ProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEstimatesThunk, fetchFlagsThunk, fetchProjectsThunk, fetchTimelineThunk, fetchWorkOrdersThunk, updateProjectThunk } from "../thunk/projectThunk";
import { getGroupedProjectsThunk, getMultiQueryThunk } from "../thunk/groupedProjectThunk";

const initialState: ProjectState = {
  projects: [] as Project[],
  loading: false,
  error: null,
  groupedProject: {
    groupedProjects: [],
    loading: false,
    error: null,
  },
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
function normalizeId(payload: string | string[] | undefined): string | null {
  if (Array.isArray(payload)) {
    return payload[0] ?? null
  }
  return payload ?? null
}
const bigIntConverter = (id: string | string[] | undefined) => {
        if (id && typeof id === 'string') {
            return BigInt(id);
        }
        return null;
    }

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
      setCurrentProject: (state, action: PayloadAction<string | string[] | undefined>) => {
        const idString = normalizeId(action.payload)
        if (!idString) {
          state.currentProject = null;
          return;
        }
        const id = bigIntConverter ? bigIntConverter(idString) : idString;
        const foundProject = state.projects.find((p) => p.id === id);
        state.currentProject = foundProject ? {...foundProject} : null;
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
                
                // Multi-query thunk - also updates groupedProjects
                .addCase(getMultiQueryThunk.pending, (state) => {
                    state.groupedProject.loading = true;
                    state.groupedProject.error = null;
                })
                .addCase(getMultiQueryThunk.fulfilled, (state, action: PayloadAction<Project[]>) => {
                    // Transform Project[] to a single GroupedProjects entry
                    state.groupedProject.groupedProjects = [{
                        groupKey: 'search_results',
                        count: action.payload.length,
                        projects: action.payload,
                    }];
                    state.groupedProject.loading = false;
                })
                .addCase(getMultiQueryThunk.rejected, (state, action) => {
                    state.groupedProject.loading = false;
                    state.groupedProject.error = action.payload as string; 
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