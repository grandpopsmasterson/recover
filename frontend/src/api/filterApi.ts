import { GroupedProjects } from "@/types/project";
import { buildQueryString, determineGroupBy } from "./utils/filterFunctions";
import { AxiosError } from "axios";
import { apiClient } from "./apiClient";

export const filterApi = {
    async getGroupedProjects(filters: string[]): Promise<GroupedProjects> {
        if (filters.length === 0){ return {} };

        const groupBy = determineGroupBy(filters);
        const query = buildQueryString(filters);

        try {
            const { data } = await apiClient.get<GroupedProjects>('/grouped', {
                params: {
                    groupBy,
                    query,
                },
            });
            console.log(data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to fetch projects: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }
};