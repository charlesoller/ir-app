import { MongoDocument } from "./MongoDocument";

export interface ProjectDTO {
  name: string;
}

export interface Project extends ProjectDTO, MongoDocument{};