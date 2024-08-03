import { db } from '../db';
import { eq } from 'drizzle-orm';
import { SelectProject, SelectTodo, projects, todos } from '../schema';
import { getTodosByProject } from './select';

export async function deleteTodo(id: SelectTodo['id']) {
  await db.delete(todos).where(eq(todos.id, id));
}

export async function deleteProject(id: SelectProject['id']) {
  const todos = await getTodosByProject(id);

  for (const todo of todos) {
    await deleteTodo(todo.id);
  }

  await db.delete(projects).where(eq(projects.id, id));
}
