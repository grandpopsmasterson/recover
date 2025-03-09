import { Estimate, Marker } from "./estimate";
import { Dispatch, SetStateAction } from "react";

// Define string literal types for better type safety
export type ProjectStage = 
  'pending sale' | 
  'work in progress' | 
  'Acct Receivable' | 
  'Needs Approval' | 
  'Complete' | 
  'Mitigation';

export type ProjectScope = 'Mitigation' | 'Contents' | 'Reconstruction';

export type ProjectType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';

export type ProjectFlag = 'Urgent' | 'Action Needed' | 'Up to Date';

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
  userId: number;
  projectId?: number;
  projectRole: string;
}

export interface Insurance {
  carrier: string;
  policyStart: Date;
  policyExpiration: Date;
  claimNumber: number;
  catReference: string;
  lossDate?: Date | null;
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

// Detailed Project Interface
export interface Project {
  id: number;
  projectName: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate?: Date | null;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  stage: ProjectStage;
  projectType: ProjectType;
  lossType: string;
  scope: string;
  houseImage: string;
  floorObject?: FloorObject[]; // this will likely be moved to long project
}

// Project State for Redux
export interface ProjectState {
  projects: Project[];
  groupedProject: GroupedProjectState;
  loading: boolean;
  error: string | null;
}

export interface LongProject {
  id: number;
  details: Project;
  insurance: Insurance;
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
  loading: boolean;
  error: string | null;
};
export interface AllLongProjectState {
  longProject: LongProject[];
  loading: boolean;
  error: string | null;
};

export interface LongProjectState {
  longProject: {
    project: Project;
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
  };
  loading: boolean;
  error: string | null;
};

export interface Timeline {
  id: number;
  materialCode: string;
  count: number;
}
export interface WorkOrder {
  id: number;
  contractor: AssignedRole[];
  area: string;
}
export interface Flag {
  id: number;
  projectId: number;
  issueType: string;
  severity: string;
}

export interface Floor {
  floorLevel: number;
  floorName: string;
  matterportUrl: string;
  matterportFloorId: string;
  demensions: Dimensions;
}

export interface Rooms {
  matterportRoomId: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  width: number;
  length: number;
  height: number;
  area: number;
}

export interface FloorObject {
  floor: Floor;
  rooms: Rooms[];
  markers: Marker[];
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
  {name: 'pending sale', group: 'Stage'}, // this needs to be adjusted
  {name: 'work in progress', group: 'Stage'}, // this needs to be adjusted
  {name: 'Acct Receivable', group: 'Stage'}, // this needs to be adjusted
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