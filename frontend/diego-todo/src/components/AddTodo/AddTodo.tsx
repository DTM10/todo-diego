import styles from './AddTodo.module.scss';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Todo as TodoType } from '../../types';
import { MdClose } from 'react-icons/md';

type SuccessfulResponse = {
  success: true;
};
interface AddTodoProps {
  projectId: number;
  setIsOpen: (isOpen: boolean) => void;
  setModalProjectId: (projectId: number) => void;
  onDataChange: (dataChanged: boolean) => void;
}
export default function AddTodo({
  projectId,
  setIsOpen,
  setModalProjectId,
  onDataChange,
}: AddTodoProps) {
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleAddTodo = async (projectId: number) => {
    const response = await axios.post<AxiosResponse>(
      'http://localhost:3001/add-todo',
      {
        name: taskName,
        description: description,
        project: projectId,
        dueDate: new Date(dueDate).toISOString(),
      }
    );
    setModalProjectId(0);
    onDataChange(true);
    setIsOpen(false);
    console.log(response.data);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setUTCHours(17, 0, 0, 0);
    setDueDate(selectedDate.toISOString().split('T')[0]);
  };

  return (
    <div className={styles.addTodo}>
      <div className={styles.addTodoContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={() => setIsOpen(false)}>
            <MdClose />
          </button>
        </div>
        <h2>Add Todo</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            id="taskName"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            onChange={handleDateChange}
            value={dueDate}
            id="dueDate"
          />
        </div>
        <button onClick={() => handleAddTodo(projectId)}>Add Todo</button>
      </div>
    </div>
  );
}
