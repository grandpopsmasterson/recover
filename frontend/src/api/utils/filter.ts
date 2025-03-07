import { filters } from "@/types/project";

export const determineGroupBy = (filter: string[]): string => {
  for (const name of filter) {
    const foundFilter = filters.find(f => f.name === name);
    
    if (foundFilter && foundFilter.group === 'Group') {
      return foundFilter.name.toLowerCase().replace(/\s+/g, '_');
    }
  }
  return 'status';
};

export const buildQueryParams = (filter: string[]): Record<string, any> => {
    const ransackParams: Record<string, any> = {};

    for (const name of filter) {
        const foundFilter = filters.find(f => f.name === name);
        if (!foundFilter || foundFilter.group === 'Group') continue;

        const group = foundFilter.group.toLowerCase();
    
    switch (group) {
        case 'status':
            ransackParams['stage_eq'] = foundFilter.name.toLowerCase();
            break;
        case 'scope':
            ransackParams['project_scope_eq'] = foundFilter.name.toLowerCase();
            break;
        case 'type':
            ransackParams['project_type_eq'] = foundFilter.name.toLowerCase();
            break;
        case 'loss':
            ransackParams['loss_type_eq'] = foundFilter.name.toLowerCase();
            break;
        case 'date':
            if (foundFilter.name === 'Last 30 Days') {
            ransackParams['created_at_gteq'] = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
            }
            break;
        default:
            const key = `${group}_eq`;
            ransackParams[key] = foundFilter.name.toLowerCase().replace(/\s+/g, '_');
        }
    }
  
    return ransackParams;
};

/**
 * This function is likely not needed anymore since we're using axios's
 * built-in parameter serialization with qs
 */
// export const buildQueryString = (filter: string[]): string => {
//   const params = new URLSearchParams();
  
//   const groupBy = determineGroupBy(filter);
//   if (groupBy) {
//     params.append('group_by', groupBy);
//   }
//   const queryParams = buildQueryParams(filter);
//   Object.entries(queryParams).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach(v => params.append(`q[${key}][]`, v));
//     } else {
//       params.append(`q[${key}]`, value.toString());
//     }
//   });
//   return params.toString();
// };