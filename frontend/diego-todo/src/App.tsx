import { useState } from 'react';
import './App.css';
import { Todo as TodoType } from './types';
import Todo from './components/Todo';

function App() {
  const todos: TodoType[] = [
    {
      id: 1,
      name: 'Todo 1',
      description: 'Todo 1 description',
      done: false,
      project: 1,
      dueDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Todo 2',
      description: 'Todo 2 description',
      done: false,
      project: 1,
      dueDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Todo 2',
      description: 'Todo 2 description',
      done: false,
      project: 1,
      dueDate: new Date(),
      createdAt: new Date(),
    },
  ];

  return (
    <main>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </main>
  );
}

export default App;
