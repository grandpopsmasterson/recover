
  
export const BREADCRUMB_CONFIG: Record<string, BreadcrumbMapping> = {
// Main hierarchy
'alpine': {
    path: '/dashboard/alpine',
    label: 'Alpine',
},
'ridgeline': {
    path: '/dashboard/ridgeline',
    label: 'Ridgeline',
    parent: 'alpine'
},
// 'frontline': {
//     path: 'dashboard/frontline',
//     label: 'Frontline',
//     parent: 'ridgeline'
// },

// Project sections
'estimate': {
    path: 'estimate',
    label: 'Estimate',
    isProjectSection: true
},
'photos': {
    path: 'photos',
    label: 'Photos',
    isProjectSection: true
},
'documents': {
    path: 'documents',
    label: 'Documents',
    isProjectSection: true
},
'drying-plan': {
    path: 'drying-plan',
    label: 'Drying Plan',
    isProjectSection: true
},
'work-orders': {
    path: 'work-orders',
    label: 'Work Orders',
    isProjectSection: true
}
};