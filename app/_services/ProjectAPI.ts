import { ProjectDTO } from '../_models/Project';
import APIService from './APIService';

class ProjectAPI extends APIService {
  static getBaseURL() {
    return `http://localhost:5099/api`;
  }

  async getProjects() {
    return await this.get(`/projects`);
  }

  async getProject(id: string) {
    return await this.get(`/projects/${id}`);
  }

  async createProject(project: ProjectDTO) {
    return await this.post('/projects', project);
  }

  async updateProject(id: string, project: ProjectDTO) {
    return await this.patch(`/projects/${id}`, project);
  }

  async deleteProject(id: string) {
    return await this.delete(`/projects/${id}`);
  }
}

export default new ProjectAPI(ProjectAPI.getBaseURL());