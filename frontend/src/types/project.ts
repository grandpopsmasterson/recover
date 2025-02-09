export interface ProjectRoleRequest {
  userId: bigint;
  projectId?: bigint;
  projectRole: string;
}

export interface ShortProject {
  id: string;
  name: string;
  description?: string;
  stage: string;
}

export interface Project extends ShortProject {
  // Additional detailed project fields
  createdAt: string;
  updatedAt?: string;
  // Add more fields as needed
}