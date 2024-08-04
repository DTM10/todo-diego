import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { getProjects, getTodosByProject } from './queries/select';

const app = new Hono();

app.get('/get-projects', async (c) => {
  getProjects()
    .then((res) => c.json(res))
    .catch((err) => c.json(err));
});

app.get('/get-todos-by-project:id', async (c) => {
  const idString = c.req.param('id');
  const id = Number(idString);
  getTodosByProject(id)
    .then((res) => c.json(res))
    .catch((err) => c.json(err));
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
