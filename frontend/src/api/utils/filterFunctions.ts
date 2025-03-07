import { filters } from "@/types/project";

export const determineGroupBy = (filter: string[]): string[] => {

    const groupBy: Set<string> = new Set();

    for (const name of filter) {

        const foundFilter = filters.find(f => f.name === name);

        if(!foundFilter) {console.log('Filter not found: ',foundFilter); continue;}

        if (foundFilter && foundFilter.group === 'Group') {
            groupBy.add(foundFilter.name.toUpperCase());
        }
    }
    console.log(groupBy, '=======================================')
    return Array.from(groupBy);
};

export const buildQueryParams = (filter: string[]): Record<string, string[]> => {
    const queryParams: Record<string, string[]> = {};

    for (const name of filter) {
        const foundFilter = filters.find(f => f.name === name);
        if (!foundFilter || foundFilter.group === 'Group') continue;

        const key = foundFilter.group.toUpperCase();
        if(!queryParams[key]) {
            queryParams[key] = [];
        }
        queryParams[key].push(foundFilter.name.toUpperCase().replace(/\s+/g,'_'));
    }
    return queryParams;
};