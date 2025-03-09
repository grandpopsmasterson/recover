import { apiService } from '@/api/service/apiService';
import { CreateProject } from '@/types/createProject';
import { Project, ListBucket, Timeline, Flag, WorkOrder, LongProject } from '@/types/project';
import { Estimate } from '@/types/estimate';
import { User } from '@/types/user';

export const projectsApi = {
  async createProject(request: CreateProject): Promise<Project> {
    return apiService.post<Project>('/projects/create-project', request);
  },

  async updateProject(projectId: string, request: CreateProject): Promise<Project> {
    return apiService.put<Project>(`/projects/${projectId}`, request);
  },

  async getAllProjects(page: number = 1, pageSize: number = 10): Promise<Project[]> {
    return apiService.get<Project[]>(`/projects?page=${page}&per_page=${pageSize}`);
  },

  async getFullProject(projectId: string): Promise<LongProject> {
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