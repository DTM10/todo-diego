import { Todo as TodoType } from '../types';
export default function Todo({
  todo: { id, name, description, done, project, dueDate, createdAt },
}: {
  todo: TodoType;
}) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Id: {id}</p>
      <p>Description:{description}</p>
      <p>Status: {done ? 'Done' : 'Not done'}</p>
      <p>Project: {project}</p>
      <p>Due Date:{dueDate.toLocaleDateString()}</p>
      <p>Created At:{createdAt.toLocaleDateString()}</p>
    </div>
  );
}
