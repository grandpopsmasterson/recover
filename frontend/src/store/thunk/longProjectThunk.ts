import { projectsApi } from "@/api/features/projectsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { prefetchProjectSectionsThunk } from "./projectThunk";

// Fetch a specific project by ID
export const fetchProjectDetailsThunk = createAsyncThunk(
    'longProject/fetchProjectOverview',
    async (projectId: string, { dispatch, rejectWithValue }) => {
        try {
            const detailsData = await projectsApi.getFullProject(projectId);
            
            // Background fetches for key sections
            dispatch(prefetchProjectSectionsThunk(projectId));
            
            return detailsData;
        } catch (error) {
            console.error(error)
            return rejectWithValue('Failed to fetch project overview');
        }
    }
);