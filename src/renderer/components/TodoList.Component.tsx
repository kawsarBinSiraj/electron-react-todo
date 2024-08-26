import { TodoType } from '../utils/interfaces/inde';
import SingleTodo from './SingleTodo.Component';

interface TodoListType {
  todos: TodoType[];
  deleteTodo: (id: string | number) => void;
  toggleTodo: (id: string | number) => void;
  updateTodoTitle: (id: string | number, title: string) => void;
}

const TodoList = ({
  todos,
  deleteTodo,
  toggleTodo,
  updateTodoTitle,
}: TodoListType) => {
  return (
    <>
      {todos.length === 0 ? (
        <p>No todo found !</p>
      ) : (
        todos?.map((todo: TodoType) => (
          <SingleTodo
            key={todo?.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodoTitle={updateTodoTitle}
          />
        ))
      )}
    </>
  );
};

export default TodoList;
