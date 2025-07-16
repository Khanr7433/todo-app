import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
        todo.completed
          ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
          : "border-blue-100 hover:border-blue-300"
      } p-6`}
    >
      <div className="flex items-center gap-4">
        {/* Custom Checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={todo.completed}
            onChange={toggleCompleted}
          />
          <div
            className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
              todo.completed
                ? "bg-green-500 border-green-500 scale-110"
                : "border-blue-300 hover:border-blue-500 hover:bg-blue-50"
            }`}
            onClick={toggleCompleted}
          >
            {todo.completed && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1">
          <input
            type="text"
            className={`w-full bg-transparent border-none outline-none text-lg font-medium transition-all duration-300 ${
              todo.completed ? "text-green-600 line-through" : "text-gray-700"
            } ${
              isTodoEditable
                ? "bg-blue-50 px-3 py-2 rounded-xl border-2 border-blue-300 focus:border-blue-500"
                : "hover:bg-gray-50 px-3 py-2 rounded-xl"
            }`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
            onKeyPress={(e) => {
              if (e.key === "Enter" && isTodoEditable) {
                editTodo();
              }
            }}
          />
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-lg ${
              todo.completed
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isTodoEditable
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:scale-110"
            }`}
            onClick={() => {
              if (todo.completed) return;
              if (isTodoEditable) {
                editTodo();
              } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
            title={isTodoEditable ? "Save changes" : "Edit task"}
          >
            {isTodoEditable ? "💾" : "✏️"}
          </button>

          {/* Delete Button */}
          <button
            className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 text-lg"
            onClick={() => deleteTodo(todo.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Completion Badge */}
      {todo.completed && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold">
          ✓ Done
        </div>
      )}
    </div>
  );
};

export default TodoItem;
