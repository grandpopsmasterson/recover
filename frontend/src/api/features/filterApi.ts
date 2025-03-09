import { apiService } from '@/api/service/apiService';
import { GroupedProjects, Project } from "@/types/project";
import { buildQueryParams, determineGroupBy } from "../utils/filter";
import qs from "qs";

export const filterApi = {
    async group(filters: string[]): Promise<GroupedProjects[]> {
        const groupBy = determineGroupBy(filters);
        const ransackParams = buildQueryParams(filters);
        const response = await apiService.get<Record<string, { count: number, projects: Project[] }>>(
            '/projects/group', 
            {
                group_by: groupBy,
                q: ransackParams
            }, 
            {
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
            }
        );
        const transformedData: GroupedProjects[] = Object.entries(response).map(([key, value]) => ({
            groupKey: key,
            count: value.count,
            projects: value.projects
        }));
        
        return transformedData;
    },
    
    async search(filters: string[]): Promise<Project[]> {
        const ransackParams = buildQueryParams(filters);
        
        return apiService.get('/projects/search', {
            q: ransackParams
        }, {
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        });
    },
}