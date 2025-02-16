import { GroupedProjects } from "@/types/project";
import { buildQuereyString, determineGroupBy } from "./utils/filterFunctions";
import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: '/api/projects',
    headers: {
        'Accept': 'application.json',
    },
    withCredentials: true,
});

export const filterApi = {
    async getGroupedProjects(filters: string[]): Promise<GroupedProjects> {
        if (filters.length === 0){ return {} };

        const groupBy = determineGroupBy(filters);
        const querey = buildQuereyString(filters);

        try {
            const { data } = await api.get<GroupedProjects>('/grouped', {
                params: {
                    groupBy,
                    querey,
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