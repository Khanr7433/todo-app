import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
              📝 Todo Manager
            </h1>
            <p className="text-blue-100 text-lg font-medium">
              Organize your tasks with style and efficiency
            </p>
          </div>

          {/* Main Container */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 animate-fadeInUp">
            {/* Add Todo Section */}
            <div className="mb-8">
              <TodoForm />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold">{todos.length}</div>
                <div className="text-blue-100 text-sm">Total Tasks</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold">
                  {todos.filter((todo) => todo.completed).length}
                </div>
                <div className="text-green-100 text-sm">Completed</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 text-white text-center">
                <div className="text-2xl font-bold">
                  {todos.filter((todo) => !todo.completed).length}
                </div>
                <div className="text-orange-100 text-sm">Pending</div>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No tasks yet
                  </h3>
                  <p className="text-gray-500">
                    Add your first task above to get started!
                  </p>
                </div>
              ) : (
                todos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="animate-slideIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-blue-100">
            <p className="text-sm">Built with ❤️ using React & Modern UI/UX</p>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
