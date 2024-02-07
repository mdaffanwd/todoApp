import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider, TodoProvider } from "./contexts";
import { ThemeBtn, TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  // ------for Theme -----
  const [theme, setTheme] = useState("light");
  const lightMode = () => {
    setTheme("light");
  };
  const darkMode = () => {
    setTheme("dark");
  };
  // ii. actual change in theme ******
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(theme)
  }, [theme])

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), todoContent: todo.todoContent, completed: false },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todos) =>
        todos.id === id ? { ...todos, completed: !todos.completed } : todos
      )
    );
  };

  //  ------------- localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos?.length ? setTodos(todos) : null;
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //  ****** theme Switcher *****


  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <ThemeProvider value={{ theme, lightMode, darkMode }}>
          <div className="bg-[#172842] h-svh w-full dark:bg-gray-900">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <div className="">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                  Manage Your Todos
                </h1>
                <ThemeBtn />
              </div>
              <div className="mb-4">
                {/* Todo form goes here */}
                <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos &&
                  todos.map((todoItem) => (
                    <div key={todoItem.id} className="w-full ">
                      <TodoItem todo={todoItem} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </TodoProvider>
    </>
  );
}

export default App;
