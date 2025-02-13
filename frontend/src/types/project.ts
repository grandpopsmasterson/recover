
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
      isAvailable: boolean;
  }[];
  stage: string;  // Changed from projectStage
  city?: string;  // Optional since not in backend
  state?: string; // Optional since not in backend
  houseImage?: string; // Optional
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
  stage: 'INITIAL' | 'IN_PROGRESS' | 'COMPLETED';
  projectType: 'RESIDENTIAL' | 'COMMERCIAL';
  carrier: string;
  assignedRoles: {
      id: number;
      shortName: string;
      profileImageUrl: string | null;
      projectRole: string;
      isAvailable: boolean;
  }[];
  houseImage?: string;
}

export interface AssignedRoles {
  id: bigint;
  shortName: string;
  profileImageUrl: string;
  projectRole: string;
  isAvailable: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'archived';
    createdAt: string;
  }

export interface ProjectBucket {
  id: bigint;
  stage: string;
  total: number;
  redTotal: number | 0;
  yellowTotal: number | 0;
  greenTotal?: number;
  revenue: number | 25000;
}