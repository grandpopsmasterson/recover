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

export const buildQueryString = (filter: string[]): string => {
    
    const groupByParams = determineGroupBy(filter)
        .map(g => `groupBy=${encodeURIComponent(g)}`)
        .join('&');

    const queryParams = buildQueryParams(filter);

    const filterParams = Object.entries(queryParams)
        .map(([key, values]) => values.map(value => `${key}=${encodeURIComponent(value)}`).join('&')).join('&');

    if (groupByParams && filterParams) {
        return [groupByParams, filterParams].filter(Boolean).join('&');
    } else if (groupByParams) {
        return groupByParams;
    } else {
        return filterParams;
    }
};