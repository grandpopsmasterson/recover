
export interface ProjectRoleRequest {
  userId: bigint;
  projectId?: bigint;
  projectRole: string;
}

export interface ShortProject {
  id: bigint;
  streetAddress: string;
  clientName: string;
  assignedRoles: {
      id: number;
      shortName: string;
      profileImageUrl: string;
      projectRole: string;
      available: boolean;
  }[];
  stage: string;  // Changed from projectStage
  city?: string;  // Optional since not in backend
  state?: string; // Optional since not in backend
  houseImageUrl?: string; // Optional
}

export interface LongProject {
  id: number;
  projectName: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate?: Date | null;
  lossDate?: Date | null;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  stage: string;
  projectType: 'RESIDENTIAL' | 'COMMERCIAL';
  carrier: string;
  assignedRoles: {
      id: number;
      shortName: string;
      profileImageUrl: string | null;
      projectRole: string;
      available: boolean;
  }[];
  houseImageUrl?: string;
}

export interface AssignedRoles {
  id: bigint;
  shortName: string;
  profileImageUrl: string;
  projectRole: string;
  available: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'archived';
    createdAt: string;
  }

export interface ListBucket {
  // id: bigint; not needed - id is for individual projects?
  name: string;
  total: number;
  redTotal: number | 0;
  yellowTotal: number | 0;
  greenTotal: number | 0;
  revenue: number | 25000;
}

export type DetailsProps = Pick<LongProject, 'lossDate' | 'startDate'>;

export interface FilterError {
  message: string;
  field?: string;
}

export interface GroupedProjects {
  groupKey: string;
  projects:ShortProject[];
  count: number;
};



export const filters = [
  {name: 'Stage', group: 'Group'},
  {name: 'Pending Sale', group: 'Stage'},
  {name: 'Scope', group: 'Group'},
  {name: 'Mitigation', group: 'Scope'},
  {name: 'Contents', group: 'Scope'},
  {name: 'Reconstruction', group: 'Scope'},
  {name: 'Flags', group: 'Group' },
  {name: 'Urgent', group: 'Flags' },
  {name: 'Action Needed', group: 'Flags' },
  {name: 'Up to Date', group: 'Flags' },
  {name: 'Invoice', group: 'Group' },
  {name: 'Invoice Pending', group: 'Invoice' },
  {name: 'Invoice Sent', group: 'Invoice' },
  {name: 'Estimate', group: 'Group' },
  {name: 'Estimate Pending', group: 'Estimate' },
  {name: 'Estimate Complete', group: 'Estimate' },
  {name: 'Loss Type', group: 'Group' },
  {name: 'Project Type', group: 'Group' },
  {name: 'Carrier', group: 'Group' },
  {name: 'Manager', group: 'Group' },
  {name: 'Adjuster', group: 'Group' },
  {name: 'Technician', group: 'Group' },
  {name: 'Tommy Tech', group: 'Technician' },
]