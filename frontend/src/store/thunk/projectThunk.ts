/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/api/clients";
import { LongProject } from "@/types/project";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjectsThunk = createAsyncThunk(
    "projects/fetchProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/projects');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching projects");
        }
    }
);

export const updateProjectThunk = createAsyncThunk(
    "projects/updateProject",
    async (updatedProject: LongProject, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/projects/${updatedProject.id}`, updatedProject);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error updating project');
        }
    }
);


