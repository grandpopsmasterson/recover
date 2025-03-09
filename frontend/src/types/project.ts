
import { Estimate } from "./estimate";
import { Dispatch, SetStateAction } from "react";

// Define string literal types for better type safety
export type ProjectStage = 
  'pending sale' | 
  'work in progress' | 
  'Acct Receivable' | 
  'Needs Approval' | 
  'Complete' | 
  'Mitigation';

export type ProjectScope = 
  'Mitigation' | 
  'Contents' | 
  'Reconstruction';

export type ProjectType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';

export type ProjectFlag = 
  'Urgent' | 
  'Action Needed' | 
  'Up to Date';

export type ProjectStatus = 'active' | 'archived';

// Reusable interface for assigned roles
export interface AssignedRole {
  id: number;
  shortName: string;
  profileImageUrl: string | null;
  projectRole: string;
  available: boolean;
}

// Project Role Request
export interface ProjectRoleRequest {
  userId: bigint;
  projectId?: bigint;
  projectRole: string;
}

// Detailed Project Interface
export interface Project {
  id: bigint;
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
  stage: ProjectStage;
  projectType: ProjectType;
  carrier: string;
  assignedRoles: AssignedRole[];
  houseImageUrl?: string;
}

// Bucket Interface for Project Grouping
export interface ListBucket {
  name: string;
  total: number;
  redTotal: number;
  yellowTotal: number;
  greenTotal: number;
  revenue: number;
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  setDisplayType: Dispatch<SetStateAction<"ListCard" | "List" | "Card">>;
}

// Filtered Project Details
export type DetailsProps = Pick<Project, 'lossDate' | 'startDate'>;

// Error Handling
export interface FilterError {
  message: string;
  field?: string;
}

// Grouped Projects
export interface GroupedProjects {
  groupKey: string;
  projects: Project[];
  count: number;
}

export interface GroupedProjectState {
  groupedProjects: GroupedProjects[];
  loading: boolean;
  error: string | null;
}

// Project State for Redux
export interface ProjectState {
  projects: Project[];
  groupedProject: GroupedProjectState;
  loading: boolean;
  error: string | null;
  overview: {
    data: Project | null;
    loading: boolean;
    error: string | null;
  };
  estimates?: {
    data: Estimate[];
    loading: boolean;
    error: string | null;
  };
  workOrders?: {
    data: WorkOrder[];
    loading: boolean;
    error: string | null;
  };
  timeline?: {
    data: Timeline[];
    loading: boolean;
    error: string | null;
  };
  flags?: {
    data: Flag[];
    loading: boolean;
    error: string | null;
  };
}

export const filters = [
  {name: 'Stage', group: 'Group'},
  {name: 'Project Scope', group: 'Group'},
  {name: 'Loss Type', group: 'Group' },
  {name: 'Project Type', group: 'Group' },
  {name: 'Carrier', group: 'Group' },
  {name: 'Manager', group: 'Group' },
  {name: 'Technician', group: 'Group' },
  {name: 'Adjuster', group: 'Group' },
  {name: 'Flags', group: 'Group' },
  
  {name: 'pending sale', group: 'Stage'},
  {name: 'work in progress', group: 'Stage'},
  {name: 'Acct Receivable', group: 'Stage'},
  {name: 'Needs Approval', group: 'Stage'},
  {name: 'Complete', group: 'Stage'},
  {name: 'Mitigation', group: 'Project Scope'},
  {name: 'Contents', group: 'Project Scope'},
  {name: 'Reconstruction', group: 'Project Scope'},
  {name: 'Urgent', group: 'Flags' },
  {name: 'Action Needed', group: 'Flags' },
  {name: 'Up to Date', group: 'Flags' },
  {name: 'Last 30 Days', group: 'Date'}
] as const;


export interface Timeline {
  id: bigint;
  materialCode: string;
  count: number;
}
export interface WorkOrder {
  id: bigint;
  contractor: AssignedRole[];
  area: string;
}
export interface Flag {
  id: bigint;
  projectId: bigint;
  issueType: string;
  severity: string;
}