import { apiService } from '@/api/service/apiService';
import { ShortProject } from "@/types/project";
import { buildQueryParams, determineGroupBy } from "../utils/filter";
import qs from "qs";

export const filterApi = {
    async group(filters: string[]): Promise<Record<string, { count: number, projects: ShortProject[] }>> {
        const groupBy = determineGroupBy(filters);
        const ransackParams = buildQueryParams(filters);
        
        return apiService.get('/projects/group', {
            group_by: groupBy,
            q: ransackParams
        }, {
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        });
    },
    
    async search(filters: string[]): Promise<ShortProject[]> {
        const ransackParams = buildQueryParams(filters);
        
        return apiService.get('/projects/search', {
            q: ransackParams
        }, {
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        });
    },
}