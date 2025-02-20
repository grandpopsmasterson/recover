import { GroupedProjects } from "@/types/project";
import { buildQueryParams, buildQueryString, determineGroupBy } from "../utils/filterFunctions";
import { AxiosError } from "axios";
import { apiClient } from "../clients";
import qs from "qs";

export const filterApi = {
    async getGroupedProjects(filters: string[]): Promise<GroupedProjects[]> {
        //if (filters.length === 0){ return {} }; unsure if this is necessary due to later changes in api calls

        const groupBy = determineGroupBy(filters);
        const query = buildQueryParams(filters);

        try {
            const { data } = await apiClient.get<GroupedProjects[]>('projects/grouped', {
                params: { groupBy, ...query, },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
            });
            console.log(data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to fetch projects: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    },

    async getMultiQuery(filters: string[]): Promise<GroupedProjects[]> {
        const groupBy = determineGroupBy(filters);
        const query = buildQueryParams(filters);

        try {
            const { data } = await apiClient.get<GroupedProjects[]>('/projects/multi-query-filter', { //TODO ADD PROPER ENDPOINT
                params: { groupBy, ...query, },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
            });
            console.log(data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to fetch projects by query: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    },
};