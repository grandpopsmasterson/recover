export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'archived';
    createdAt: string;
  }