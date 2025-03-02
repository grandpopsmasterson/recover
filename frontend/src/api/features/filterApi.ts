import { GroupedProjects, ShortProject } from "@/types/project";
import { buildQueryParams, determineGroupBy } from "../utils/filterFunctions";
import { AxiosError } from "axios";
import { apiClient } from "../clients";
import qs from "qs";

export const filterApi = {
    
    async group(filters: string[]): Promise<Record<string, { count: number, projects: ShortProject[] }>> {
    
        const groupBy = determineGroupBy(filters);
        
        const ransackParams = buildQueryParams(filters);
        
        try {
            const { data } = await apiClient.get('projects/group', {
                params: { 
                group_by: groupBy,
                q: ransackParams
                },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
            });
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`Failed to fetch grouped projects: ${error.response?.data?.error || error.message}`);
            }
            throw error;
        }
    },
  
    async search(filters: string[]): Promise<ShortProject[]> {
        const ransackParams = buildQueryParams(filters);
        
        try {
            const { data } = await apiClient.get('/projects/search', {
                params: { 
                q: ransackParams
                },
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
            });
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
                throw new Error(`Failed to search projects: ${errorMessage}`);
            }
            throw error;
        }
    },
};