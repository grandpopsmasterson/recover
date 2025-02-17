import { filters } from "@/types/project";

export const determineGroupBy = (filter: string[]): string => {
    for (const name of filter) {

        const foundFilter = filters.find(f => f.name === name);

        if(!foundFilter) {console.log('Filter not found: ',foundFilter); continue;}

        if (foundFilter.group === 'Group') {
            if (filter.some(f => f.toLowerCase().includes('stage'))) return 'STAGE';
            if (filter.some(f => f.toLowerCase().includes('flags'))) return 'FLAGS';
            if (filter.some(f => f.toLowerCase().includes('owner'))) return 'OWNER';
            if (filter.some(f => f.toLowerCase().includes('invoice'))) return 'INVOICE';
            if (filter.some(f => f.toLowerCase().includes('estimate'))) return 'ESTIMATE';
            if (filter.some(f => f.toLowerCase().includes('scope'))) return 'SCOPE';
        }

        // const groupMap: Record<string, string> = {
        //     Stage: 'STAGE',
        //     Flags: 'FLAGS',
        //     Owner: 'OWNER',
        //     Invoice: 'INVOICE',
        //     Estimate: 'ESTIMATE',
        //     Scope: 'SCOPE',
        // };

        // if (foundFilter.group in groupMap) {
        //     return groupMap[foundFilter.group];
        // }
        return foundFilter.group.toUpperCase(); // above logic for if needed (currently collapsed)
    }
    return 'STAGE'; // Default group for no matches
};

export const buildQueryString = (filter: string[]): string => {
    for (const name of filter){
    const foundFilter = filters.find(f => f.name === name);

    if(!foundFilter){ console.log("Filter not found: ", foundFilter); continue;}

    if (foundFilter.group === 'Group') {
        continue;
    }
    
    return filter
        .filter(f => !['STAGE', 'FLAGS', 'OWNER', 'INVOICE', 'ESTIMATE', 'SCOPE'].includes(f)) //removing the grouping filters
        .join(' '); // Join the filters together with a space //TODO IS THIS NEEDED????
    }
    return '' //default querey for no queries
};