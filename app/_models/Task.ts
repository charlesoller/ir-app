import { MongoDocument } from "./MongoDocument";

export interface TaskDTO {
  title: string;
  message: string;
  complete?: boolean;
  projectId: string;
}

export interface Task extends TaskDTO, MongoDocument {};