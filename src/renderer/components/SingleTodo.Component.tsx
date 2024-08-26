import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import {
  IoIosCheckmarkCircleOutline,
  IoIosRadioButtonOff,
} from 'react-icons/io';
import { TodoType } from '../utils/interfaces/inde';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface SingleTodoType {
  todo: TodoType;
  deleteTodo: (id: string | number) => void;
  toggleTodo: (id: string | number) => void;
  updateTodoTitle: (id: string | number, title: string) => void;
}

const SingleTodo = ({
  todo,
  deleteTodo,
  toggleTodo,
  updateTodoTitle,
}: SingleTodoType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleRemoveTodo = () => {
    toast.remove();
    deleteTodo(todo?.id);
    toast.success('Todo Deleted Successfully.');
  };

  const handleToggleTodo = () => {
    toast.remove();
    toggleTodo(todo?.id);
    toast.success('Todo Updated Successfully.');
  };

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.remove();

    if (editTitle.trim() === '') {
      return toast.error('Todo field can not be empty.');
    }

    updateTodoTitle(todo?.id, editTitle);
    setEditMode(false);
    setEditTitle('');
    toast.success('Todo Updated Successfully.');
  };

  const handleEditMode = () => {
    setEditTitle(todo?.name);
    setEditMode(true);
  };

  return (
    <div className="card mb-2 px-2 py-1 rounded">
      <div className="item d-flex justify-content-between align-items-center gap-2">
        <div className="left d-flex align-items-center w-100">
          <div className="icon me-1">
            {todo?.isCompleted ? (
              <IoIosCheckmarkCircleOutline
                fill="#00b341"
                style={{ height: 25, width: 25 }}
                onClick={handleToggleTodo}
              />
            ) : (
              <IoIosRadioButtonOff
                fill="#ff9300"
                style={{ width: 25, height: 25 }}
                onClick={handleToggleTodo}
              />
            )}
          </div>
          {editMode ? (
            <form
              onSubmit={handleUpdateTodo}
              className="d-flex align-items-center justify-content-between gap-2 w-100"
            >
              <input
                type="text"
                value={editTitle}
                className="form-control form-control-sm w-100"
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-sm btn-warning">
                Update
              </button>
            </form>
          ) : (
            <p
              className="mb-0 align-self-center ellips-one-line"
              title={todo?.name}
            >
              {todo?.name}
            </p>
          )}
        </div>

        {!editMode ? (
          <div className="right">
            <FiEdit
              stroke="#ff9300"
              style={{ width: 20, height: 20 }}
              onClick={handleEditMode}
            />
            <BsTrash3
              fill="#ff2825"
              style={{ width: 20, height: 20 }}
              onClick={handleRemoveTodo}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SingleTodo;
