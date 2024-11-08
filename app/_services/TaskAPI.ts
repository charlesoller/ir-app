import { TaskDTO } from '../_models/Task';
import APIService from './APIService';

class TaskAPI extends APIService {
  static getBaseURL() {
    return `http://localhost:5099/api`;
  }

  async getTasks() {
    return await this.get(`/tasks`);
  }

  async getTask(id: string) {
    return await this.get(`/tasks/${id}`);
  }

  async createTask(task: TaskDTO) {
    return await this.post('/tasks', task);
  }

  async toggleTaskComplete(id: string) {
    return await this.patch(`/tasks/${id}/toggle`, {});
  }

  async updateTask(id: string, task: TaskDTO) {
    return await this.patch(`/tasks/${id}`, task);
  }

  async deleteTask(id: string) {
    return await this.delete(`/tasks/${id}`);
  }
}

export default new TaskAPI(TaskAPI.getBaseURL());