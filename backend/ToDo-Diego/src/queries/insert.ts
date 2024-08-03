import { db } from '../db';
import { InsertProject, InsertTodo, projects, todos } from '../schema';

export async function createProject(data: InsertProject) {
  await db.insert(projects).values(data);
}

export async function createTodo(data: InsertTodo) {
  await db.insert(todos).values(data);
}
