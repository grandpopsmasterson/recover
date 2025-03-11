import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectsApi } from "@/api/features/projectsApi";
import { CreateProject } from "@/types/createProject";

export const fetchProjectsThunk = createAsyncThunk(
    'projects/fetchProjects',
    async ({ page = 1, pageSize = 10 }: { page?: number, pageSize?: number }, { rejectWithValue }) => {
        try {
            return await projectsApi.getAllProjects(page, pageSize);
        } catch (error) {
            return rejectWithValue(
            error instanceof Error 
                ? error.message 
                : 'Failed to fetch projects'
            );
        }
    }
);

// Create a new project
export const createProjectThunk = createAsyncThunk(
  'projects/createProject',
  async (projectData: CreateProject, { rejectWithValue }) => {
    try {
      return await projectsApi.createProject(projectData);
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to create project');
    }
  }
);

// Update an existing project
export const updateProjectThunk = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, projectData }: { projectId: string, projectData: CreateProject }, { rejectWithValue }) => {
    try {
      return await projectsApi.updateProject(projectId, projectData);
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to update project');
    }
  }
);

// Fetch all buckets
export const fetchBucketsThunk = createAsyncThunk(
  'projects/fetchBuckets',
  async (_, { rejectWithValue }) => {
    try {
      return await projectsApi.getAllBuckets();
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch buckets');
    }
  }
);

// Fetch all users
export const fetchUsersThunk = createAsyncThunk(
  'projects/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await projectsApi.getAllUsers();
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch users');
    }
  }
);



// Prefetch project sections
export const prefetchProjectSectionsThunk = createAsyncThunk(
  'projects/prefetchSections',
  async (projectId: string, { dispatch }) => {
    // Concurrent background fetches
    await Promise.allSettled([
      dispatch(fetchEstimatesThunk(projectId)),
      dispatch(fetchTimelineThunk(projectId)),
      dispatch(fetchFlagsThunk(projectId)),
      dispatch(fetchWorkOrdersThunk(projectId))
    ]);
  }
);

// Fetch financial reports
export const fetchEstimatesThunk = createAsyncThunk(
  'projects/estimate',
  async (projectId: string, { rejectWithValue }) => {
    try {
      return await projectsApi.getEstimate(projectId);
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch estimates');
    }
  }
);

// Fetch progress reports
export const fetchTimelineThunk = createAsyncThunk(
  'projects/timeline',
  async (projectId: string, { rejectWithValue }) => {
    try {
      return await projectsApi.getTimeline(projectId);
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch timeline');
    }
  }
);

// Fetch flagged issues
export const fetchFlagsThunk = createAsyncThunk(
  'projects/flag',
  async (projectId: string, { rejectWithValue }) => {
    try {
      return await projectsApi.getFlags(projectId);
    } catch (error) {
      console.error(error)
      return rejectWithValue('Failed to fetch flagged issues');
    }
  }
);

// Fetch flagged issues
export const fetchWorkOrdersThunk = createAsyncThunk(
    'projects/work_order',
    async (projectId: string, { rejectWithValue }) => {
      try {
        return await projectsApi.getWorkOrders(projectId);
      } catch (error) {
        console.error(error)
        return rejectWithValue('Failed to fetch work orders');
      }
    }
);