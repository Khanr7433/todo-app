import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };
  return (
    <div className="w-full">
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What do you need to accomplish today?"
            className="w-full px-6 py-4 text-gray-700 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder-gray-400 shadow-lg text-lg"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span className="text-blue-400 text-xl">✨</span>
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
          disabled={!todo.trim()}
        >
          <span className="text-lg">➕</span>
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
