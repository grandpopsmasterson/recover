/* eslint-disable @typescript-eslint/no-explicit-any */
import { filterApi } from "@/api/features/filterApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGroupedProjectsThunk = createAsyncThunk(
    "projects/group",
    async (filters: string[], { rejectWithValue }) => {
        try {
            const groupedData = await filterApi.group(filters);
            return groupedData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching grouped projects');
        }
    }
);

export const getMultiQueryThunk = createAsyncThunk(
    "projects/search",
    async (filters: string[], { rejectWithValue }) => {
        try {
            const projects = await filterApi.search(filters);
            return projects;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching projects');
        }
    }
);