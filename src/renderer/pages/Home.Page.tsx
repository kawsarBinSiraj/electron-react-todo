import { useEffect, useState } from 'react';
import AddTodo from '../components/AddTodo.Component';
import TodoList from '../components/TodoList.Component';
import { TodoType } from '../utils/interfaces/inde';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([
    // {
    //   id: 1,
    //   name: 'Hello one',
    //   isCompleted: true,
    // },
    // {
    //   id: 2,
    //   name: 'Hello two',
    //   isCompleted: false,
    // },
  ]);

  useEffect(() => {
    const getLocalTodo = localStorage.getItem('todos');
    if (getLocalTodo) {
      setTodos(JSON.parse(getLocalTodo));
    }
  }, []);

  const addTodo = (data: TodoType) => {
    setTodos((prevState) => {
      const updatedTodo = [...prevState, data];
      localStorage.setItem('todos', JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  };

  const updateTodoTitle = (id: string | number, title: string) => {
    setTodos((prevState) => {
      const updatedTodo = prevState.map((todo) =>
        todo.id === id ? { ...todo, name: title } : todo,
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  };

  const toggleTodo = (id: string | number) => {
    setTodos((prevState) => {
      const updatedTodo = prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  };

  const deleteTodo = (id: string | number) => {
    setTodos((prevState) => {
      const updatedTodo = prevState.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  };

  return (
    <section className="todo py-5">
      <div className="container-lg">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="contents">
              <div className="header d-flex justify-content-between mb-3">
                <h4 className="align-self-center font-weight-bold">Todo App With <span className='text-primary'>Electron Js</span></h4>
              </div>

              <AddTodo addTodo={addTodo} />

              <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                updateTodoTitle={updateTodoTitle}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Home;
