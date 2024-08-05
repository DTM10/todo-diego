import { useEffect, useState } from 'react';
import './App.css';
import { Todo as TodoType, Project as ProjectType } from './types';
import Todo from './components/Todo/Todo';
import axios from 'axios';
import AddTodo from './components/AddTodo/AddTodo';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

interface TodosResponseData {
  project: ProjectType;
  todos: TodoType[];
}
function App() {
  const [projectName, setProjectName] = useState<string>('');
  const [data, setData] = useState<TodosResponseData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalProjectId, setModalProjectId] = useState<number>(0);
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const fetchTodos = async () => {
    const response = await axios.get<TodosResponseData[]>(
      'http://localhost:3001/get-todos-by-project'
    );
    console.log(response.data);
    setData(response.data);
  };

  const handleAddProject = async () => {
    console.log('projectName', projectName);

    const response = await axios.post<ProjectType>(
      'http://localhost:3001/add-project',
      {
        name: projectName,
      }
    );
    console.log(response.data);
  };
  const handleAddTaskPress = (projectId: number) => {
    console.log('projectId', projectId);
    setModalProjectId(projectId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTodos();
    if (dataChanged) {
      setDataChanged(false);
    }
  }, [dataChanged]);

  return (
    <main>
      {data.map((proj) => {
        return (
          <section>
            <h2>{proj.project.name}</h2>
            <ol>
              {proj.todos.map((todo) => {
                console.log('todo: ', todo);

                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onDataChange={setDataChanged}
                  />
                );
              })}
            </ol>
            <button
              onClick={() => {
                handleAddTaskPress(proj.project.id);
              }}
            >
              <MdOutlineAddCircleOutline /> Todo
            </button>
          </section>
        );
      })}

      {isModalOpen && (
        <AddTodo
          projectId={modalProjectId}
          setIsOpen={setIsModalOpen}
          setModalProjectId={setModalProjectId}
          onDataChange={setDataChanged}
        />
      )}
      <div className="add-project-container">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button onClick={handleAddProject}>
          <MdOutlineAddCircleOutline /> Project
        </button>
      </div>
    </main>
  );
}

export default App;
