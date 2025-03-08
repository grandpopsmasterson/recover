/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/api/clients";
import { determineGroupBy, buildQueryParams } from "@/api/utils/filterFunctions";
import { GroupedProjects } from "@/types/project";
import { createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";

export const getGroupedProjectsThunk = createAsyncThunk(
    "projects/groupedProjects",
    async (filters: string[], { rejectWithValue }) => {
        const groupBy = determineGroupBy(filters);
        const query = buildQueryParams(filters);
        try {
            const { data } = await apiClient.get<GroupedProjects[]>("/projects", {
                //TODO DAVE FIGURE OUT THE ENDPOINT FOR THIS ------------^ its currently returning all the projects, no bucket with count and groupKey
                params: { groupBy, ...query, },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
            });

            console.log(data)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching grouped projects')
        }
    }
);

export const getMultiQueryThunk = createAsyncThunk(
    "projects/queryProjects",
    async (filters: string[], { rejectWithValue }) => {
        const groupBy = determineGroupBy(filters);
        const query = buildQueryParams(filters);
        try {
            const { data } = await apiClient.get<GroupedProjects[]>("projects/multi-query-filter", {
                params: { groupBy, ...query, },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching grouped projects')
        }
    }
);