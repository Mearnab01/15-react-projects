import { useState } from "react";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Add new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Start editing
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  // Finish editing
  const finishEdit = (id: number) => {
    if (!editValue.trim()) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editValue } : t)));
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Todo List
        </h1>

        {/* Add todo */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-center gap-2 flex-1">
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.completed ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                </button>

                {editingId === todo.id ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => finishEdit(todo.id)}
                    onKeyDown={(e) => e.key === "Enter" && finishEdit(todo.id)}
                    autoFocus
                    className="flex-1 border-b border-blue-500 focus:outline-none px-1"
                  />
                ) : (
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button onClick={() => startEdit(todo.id, todo.text)}>
                  <Edit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
