import { apiClient } from './apiClient';
import { CreateProject } from '@/types/createProject';
import { ShortProject, Project, LongProject, ProjectBucket } from '@/types/project';

export const projectsApi = {

  async createProject(request: CreateProject): Promise<ShortProject> {
    try {
      return await apiClient.post('/projects/create-project', request);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, request: CreateProject): Promise<ShortProject> {
    try {
      return await apiClient.put(`/projects/${projectId}`, request);
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  },

  async getAllProjects(): Promise<ShortProject[]> {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data; // Extract the data from the axios response
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  async getProject(projectId: string): Promise<LongProject> {
    try {
      const response = await apiClient.get(`/projects/${projectId}`);
      return response.data; // Extract the data from the axios response
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      throw error;
    }
  },
  async getAllBuckets(): Promise<ProjectBucket[]> {
    try {
      const response = await apiClient.get('/dashboard/altitude');
      return response.data; // Extract the data from the axios response
    } catch (error) {
      console.error('Failed to fetch buckets:', error);
      throw error;
    }
  }
};