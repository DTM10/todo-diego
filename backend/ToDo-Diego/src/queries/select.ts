import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../db';
import { SelectProject, SelectTodo, todos, projects } from '../schema';

export async function getProjects(id: SelectProject['id']): Promise<
  Array<{
    id: number;
    name: string;
  }>
> {
  return db.select().from(projects).where(eq(projects.id, id));
}

export async function getTodos(id: SelectTodo['id']): Promise<
  Array<{
    id: number;
    name: string;
    done: boolean;
    project: number;
    dueDate: Date;
  }>
> {
  return db.select().from(todos).where(eq(todos.id, id));
}

export async function getTodosByProject(id: SelectProject['id']): Promise<
  Array<{
    id: number;
    name: string;
    done: boolean;
    project: number;
    dueDate: Date;
  }>
> {
  return db.select().from(todos).where(eq(todos.project, id));
}
