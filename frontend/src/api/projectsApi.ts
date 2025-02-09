import { apiClient } from './apiClient';
import { CreateProject } from '@/types/createProject';
import { ShortProject, Project } from '@/types/project';

const projectsApi = {
  /**
   * Create a new project
   * @param request CreateProjectRequest data
   * @returns Created project details
   */
  async createProject(request: CreateProject): Promise<ShortProject> {
    try {
      return await apiClient.post('/projects', request);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  /**
   * Update an existing project
   * @param projectId ID of the project to update
   * @param request Project update data
   * @returns Updated project details
   */
  async updateProject(projectId: string, request: CreateProject): Promise<ShortProject> {
    try {
      return await apiClient.put(`/projects/${projectId}`, request);
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  },

  /**
   * Fetch all projects
   * @returns List of projects
   */
  async getAllProjects(): Promise<ShortProject[]> {
    try {
      return await apiClient.get('/projects');
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  /**
   * Fetch a specific project by ID
   * @param projectId ID of the project to fetch
   * @returns Detailed project information
   */
  async getProject(projectId: string): Promise<Project> {
    try {
      return await apiClient.get(`/projects/${projectId}`);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      throw error;
    }
  }
};

export default projectsApi;