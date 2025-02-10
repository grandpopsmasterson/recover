
export interface ProjectRoleRequest {
  userId: bigint;
  projectId?: bigint;
  projectRole: string;
}

export interface ShortProject {
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

