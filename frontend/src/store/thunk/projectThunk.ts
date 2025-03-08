/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectsApi } from "@/api/features/projectsApi";
import {
  ListBucket,
  ShortProject, 
  Estimate,
  Timeline,
  Work Orders, 
  Progress
} from "@/types/project";
import { CreateProject } from "@/types/createProject";
import { User } from "@/components/buttons/AssignButton";
import { RootState } from "../store";

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
      return rejectWithValue('Failed to update project');
    }
  }
);

// Fetch a specific project by ID
export const fetchProjectDetailsThunk = createAsyncThunk(
    'projects/fetchProjectOverview',
    async (projectId: string, { dispatch, rejectWithValue }) => {
      try {
        const detailsData = await projectsApi.getProject(projectId);
        
        // Background fetches for key sections
        dispatch(prefetchProjectSectionsThunk(projectId));
        
        return detailsData;
      } catch (error) {
        return rejectWithValue('Failed to fetch project overview');
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
  async (projectId: string, { getState, rejectWithValue }) => {
    try {
      return await projectsApi.getEstimate(projectId);
    } catch (error) {
      return rejectWithValue('Failed to fetch estimates');
    }
  }
);

// Fetch progress reports
export const fetchTimelineThunk = createAsyncThunk(
  'projects/timeline',
  async (projectId: string, { getState, rejectWithValue }) => {
    try {
      return await projectsApi.getTimeline(projectId);
    } catch (error) {
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
        return rejectWithValue('Failed to fetch work orders');
      }
    }
);