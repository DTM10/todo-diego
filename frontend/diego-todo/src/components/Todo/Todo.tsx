import { Todo as TodoType } from '../../types';
import { useState } from 'react';
import styles from './Todo.module.scss';
import {
  MdDelete,
  MdEdit,
  MdSave,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import axios, { AxiosResponse } from 'axios';

interface TodoProps {
  todo: TodoType;
  onDataChange: (dataChanged: boolean) => void;
}
export default function Todo({
  todo: { id, name, description, done, dueDate },
  onDataChange,
}: TodoProps) {
  const dueDateObj = new Date(dueDate);
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState<string>(name);
  const [descriptionName, setDescriptionName] = useState<string>(description);
  const [innerDueDate, setInnerDueDate] = useState<Date>(dueDate);
  const [isDone, setIsDone] = useState<boolean>(done);

  console.log('done', done);

  const handleSaveEdit = async () => {
    console.log('handleSaveEdit', id);
    const response = await axios.patch<AxiosResponse>(
      `http://localhost:3001/edit-todo/${id}`,
      {
        name: projectName,
        description: descriptionName,
        dueDate: innerDueDate.toISOString(),
        done: isDone,
      }
    );

    console.log(response);
    setIsEditing(false);
    onDataChange(true);
  };

  const handleEditOrSavePress = () => {
    if (isEditing) {
      handleSaveEdit();
    }
    setIsEditing(!isEditing);
  };
  const handleDeleteTodo = async () => {
    console.log('handleDeleteTodo', id);
    const response = await axios.delete<AxiosResponse>(
      `http://localhost:3001/delete-todo/${id}`
    );
    console.log(response.data);
    onDataChange(true);
  };

  return (
    <li className={styles.todo}>
      {isEditing ? (
        <p>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </p>
      ) : (
        <h3>{name}</h3>
      )}
      <div className={styles.buttonsContainer}>
        <button onClick={handleEditOrSavePress}>
          {isEditing ? <MdSave /> : <MdEdit />}
        </button>
        <button onClick={handleDeleteTodo}>
          <MdDelete />
        </button>
      </div>

      {isEditing ? (
        <p>
          <input
            type="text"
            defaultValue={description}
            onChange={(e) => setDescriptionName(e.target.value)}
          />
        </p>
      ) : (
        <p>
          <span>Description:</span> {description}
        </p>
      )}
      {isEditing ? (
        <p>
          <span>Due Date:</span>{' '}
          <input
            type="date"
            onChange={(e) => setInnerDueDate(new Date(e.target.value))}
          />
        </p>
      ) : (
        <p>
          <span>Due Date:</span> {dueDateObj.toLocaleDateString()}
        </p>
      )}

      {isEditing ? (
        <p>
          <span>Status:</span>{' '}
          <button onClick={() => setIsDone(!isDone)}>
            {isDone ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>
        </p>
      ) : (
        <p>
          <span>Status:</span>{' '}
          {done ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
        </p>
      )}
    </li>
  );
}
