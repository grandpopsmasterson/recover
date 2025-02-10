
export interface ProjectRoleRequest {
  userId: bigint;
  projectId?: bigint;
  projectRole: string;
}

export interface ShortProject {
  id: bigint;
  streetAddress: string;
  city: string;
  state: string;
  clientName: string;
  assignedRoles: AssignedRoles[];
  projectStage: string;
  houseImage: string; 
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

