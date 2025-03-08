import { apiService } from '@/api/service/apiService';
import { User } from '@/components/buttons/AssignButton';
import { CreateProject } from '@/types/createProject';
import { ShortProject, LongProject, ListBucket, Timeline, Flag, WorkOrder } from '@/types/project';
import { Estimate } from '@/types/estimate';

export const projectsApi = {
  async createProject(request: CreateProject): Promise<LongProject> {
    return apiService.post<LongProject>('/projects/create-project', request);
  },

  async updateProject(projectId: string, request: CreateProject): Promise<LongProject> {
    return apiService.put<LongProject>(`/projects/${projectId}`, request);
  },

  async getAllProjects(page: number = 1, pageSize: number = 10): Promise<LongProject[]> {
    return apiService.get<LongProject[]>(`/projects?page=${page}&per_page=${pageSize}`);
  },

  async getProject(projectId: string): Promise<LongProject> {
    return apiService.get<LongProject>(`/projects/${projectId}`);
  },

  async getAllBuckets(): Promise<ListBucket[]> {
    return apiService.get<ListBucket[]>('/dashboard/buckets');
  },

  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>('/users');
  },

  // New methods to match your thunks
  async getEstimate(projectId: string): Promise<Estimate> {
    return apiService.get<Estimate>(`/projects/${projectId}/estimate`);
  },

  async getTimeline(projectId: string): Promise<Timeline> {
    return apiService.get<Timeline>(`/projects/${projectId}/timeline`);
  },

  async getFlags(projectId: string): Promise<Flag> {
    return apiService.get<Flag>(`/projects/${projectId}/flags`);
  },

  async getWorkOrders(projectId: string): Promise<WorkOrder[]> {
    return apiService.get<WorkOrder[]>(`/projects/${projectId}/work-orders`);
  }
};