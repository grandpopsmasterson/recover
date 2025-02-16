export interface GroupedProjects {
    [key: string]: string[]; // TODO CREATE THE INTERFACE FOR RECIEVING DATA
};

export const filters = [
    {name: 'Technicians', group: 'Group' },
    {name: 'Tommy Technician', group: 'Technician' },
    {name: 'Pending Sale', group: 'Group'},
    {name: 'Flags', group: 'Group' },
    {name: 'Flags: Urgent', group: 'Flags' },
    {name: 'Flags: Action Needed', group: 'Flags' },
    {name: 'Flags: Up to Date', group: 'Flags' },
    {name: 'Invoice', group: 'Group' },
    {name: 'Invoice Pending', group: 'Invoice' },
    {name: 'Invoice Sent', group: 'Invoice' },
    {name: 'Estimate', group: 'Group' },
    {name: 'Estimate Pending', group: 'Estimate' },
    {name: 'Estimate Complete', group: 'Estimate' },
]