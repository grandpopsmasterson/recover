export interface ShortProject {
  streetAddress: string;
  clientName: string;
  assignedRoles: AssignedRoles[];
  projectStage: string;
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