import { eq } from 'drizzle-orm';
import { db } from '../db';
import { SelectProject, SelectTodo, todos, projects } from '../schema';

export async function updateTodo(
  id: SelectTodo['id'],
  data: Partial<Omit<SelectTodo, 'id'>>
) {
  await db.update(todos).set(data).where(eq(todos.id, id));
}

export async function updateProject(
  id: SelectProject['id'],
  data: Partial<Omit<SelectProject, 'id'>>
) {
  await db.update(projects).set(data).where(eq(projects.id, id));
}
