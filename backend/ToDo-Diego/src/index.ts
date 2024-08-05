import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getProjects, getTodosByProject } from './queries/select';
import { createProject, createTodo } from './queries/insert';
import { deleteTodo } from './queries/delete';
import { updateTodo } from './queries/update';

const app = new Hono();

app.use('*', (ctx, next) => {
  const wrapped = cors({
    origin: 'http://localhost:5173',
    allowHeaders: [
      'X-Custom-Header',
      'Upgrade-Insecure-Requests',
      'Content-Type',
    ],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  });
  return wrapped(ctx, next);
});

app.get('/get-projects', async (c) => {
  const projects = await getProjects();
  if (!projects) {
    return c.json([]);
  } else {
    return c.json(projects);
  }
});

app.get('/get-todos-by-project', async (c) => {
  const projects = await getProjects();
  if (!projects) {
    return c.json([]);
  } else {
    const todos = [];

    for (const project of projects) {
      const todosByProject = await getTodosByProject(project.id);
      todos.push({ project: { ...project }, todos: todosByProject });
    }

    console.log(todos);

    return c.json(todos);
  }
});

app.post('/add-project', async (c) => {
  const { name } = await c.req.json();

  createProject({ name: name }).then(() => {
    return c.json({ success: true });
  });
});

app.post('/add-todo', async (c) => {
  const { name, description, project, dueDate } = await c.req.json();
  console.log(name, description, project, dueDate);

  createTodo({
    name: name,
    description: description,
    project: project,
    dueDate: new Date(dueDate),
  }).then(() => {
    return c.json({ success: true });
  });
});

app.patch('/edit-todo/:id', async (c) => {
  const idString = c.req.param('id');
  const id = Number(idString);
  const body = await c.req.json();
  const treatedBody = { ...body, dueDate: new Date(body.dueDate) };
  console.log('request body', treatedBody);

  if (typeof id !== 'number') {
    return c.json({ success: false });
  }

  updateTodo(id, treatedBody).then(() => {
    return c.json({ success: true });
  });

  return c.json({ success: false });
});

app.delete('/delete-todo/:id', async (c) => {
  const idString = c.req.param('id');
  const id = Number(idString);
  if (typeof id !== 'number') {
    return c.json({ success: false });
  }
  deleteTodo(id);

  return c.json({ success: true });
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
