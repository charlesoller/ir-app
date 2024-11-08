import { Task, TaskDTO } from "../_models/Task";
import TaskAPI from "../_services/TaskAPI";
import { createGlobalStore } from "../_utils/GlobalStore"; 
import _ from 'lodash';
import ProjectAPI from "../_services/ProjectAPI";
import { Project, ProjectDTO } from "../_models/Project";

interface AppStoreInterface {
  applicationName: string;
  tasks: Task[];
  activeTasks: Task[];
  projects: Project[];
  isLoadingTasks: boolean;
  loadTasks: () => void;
  loadProjects: () => void;
  toggleTaskComplete: (id: string) => Promise<void>; 
  updateTask: (id: string, task: TaskDTO) => Promise<void>;
  createTask: (task: TaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createProject: (project: ProjectDTO) => Promise<string>;
  updateProject: (id: string, project: ProjectDTO) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const AppStore: AppStoreInterface = createGlobalStore({
  applicationName: 'Demo',
  tasks: [],
  activeTasks: [],
  projects: [],
  isLoadingTasks: false,
  loadTasks: () => {
    TaskAPI.getTasks()
      .then(res => AppStore.tasks = res)
      .then(res => {
        if (!AppStore.activeTasks) AppStore.activeTasks = res
      })
      .catch(err => console.error(err))
  },
  loadProjects: () => {
    ProjectAPI.getProjects()
      .then(res => AppStore.projects = res)
      .catch(err => console.error(err))
  },
  toggleTaskComplete: async (id: string) => {
		const currentIndex = _.findIndex(AppStore.tasks, (t) => t._id === id);
    const updatedTask = await TaskAPI.toggleTaskComplete(id);
    AppStore.tasks[currentIndex] = updatedTask;
  },
  updateTask: async (id: string, task: TaskDTO) => {
    const currentIndex = _.findIndex(AppStore.tasks, (t) => t._id === id);
    const updatedTask = await TaskAPI.updateTask(id, task);
    AppStore.tasks[currentIndex] = updatedTask;
  },
  createTask: async (task: TaskDTO) => {
    const newTask = await TaskAPI.createTask(task);
    AppStore.tasks = [...AppStore.tasks, newTask];
  },
  deleteTask: async (id: string) => {
    const currentIndex = _.findIndex(AppStore.tasks, (t) => t._id === id);
    TaskAPI.deleteTask(id);
    AppStore.tasks.splice(currentIndex, 1);
  },
  createProject: async (project: ProjectDTO) => {
    const newProject = await ProjectAPI.createProject(project);
    AppStore.projects = [...AppStore.projects, newProject];
    return newProject._id;
  },
  updateProject: async (id: string, project: ProjectDTO) => {
    const currentIndex = _.findIndex(AppStore.projects, (p) => p._id === id);
    const updatedProject = await ProjectAPI.updateProject(id, project);
    AppStore.projects[currentIndex] = updatedProject;
  },
  deleteProject: async (id: string) => {
    const currentIndex = _.findIndex(AppStore.projects, (p) => p._id === id);
    ProjectAPI.deleteProject(id);
    AppStore.projects.splice(currentIndex, 1);
  }
})

export default AppStore;