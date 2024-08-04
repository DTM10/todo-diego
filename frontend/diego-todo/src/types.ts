export interface Todo {
  id: number;
  name: string;
  description: string;
  done: boolean;
  project: number;
  dueDate: Date;
  createdAt: Date;
}
export interface Project {
  id: number;
  name: string;
}
