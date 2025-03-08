import { apiService } from '@/api/service/apiService';
import { User } from '@/components/buttons/AssignButton';
import { CreateProject } from '@/types/createProject';
import { ShortProject, LongProject, ListBucket } from '@/types/project';

export const projectsApi = {
  async createProject(request: CreateProject): Promise<ShortProject> {
    return apiService.post<ShortProject>('/projects/create-project', request);
  },

  async updateProject(projectId: string, request: CreateProject): Promise<ShortProject> {
    return apiService.put<ShortProject>(`/projects/${projectId}`, request);
  },

  async getAllProjects(): Promise<ShortProject[]> {
    return apiService.get<ShortProject[]>('/projects');
  },

  async getProject(projectId: string): Promise<LongProject> {
    return apiService.get<LongProject>(`/projects/${projectId}`);
  },

  async getAllBuckets(): Promise<ListBucket[]> {
    return apiService.get<ListBucket[]>('/dashboard/buckets');
  },

  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>('/users');
  }
};