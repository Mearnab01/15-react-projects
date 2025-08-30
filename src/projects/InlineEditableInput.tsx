import { useState, useRef } from "react";

type Item = {
  id: number;
  text: string;
};

const InlineEditableInput = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Finish project" },
    { id: 3, text: "Call a friend" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const finishEditing = () => {
    if (editingId !== null) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text: editValue } : item
        )
      );
    }
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") finishEditing();
    if (e.key === "Escape") {
      setEditingId(null);
      setEditValue("");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Inline Editable List
        </h1>

        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
            >
              {editingId === item.id ? (
                <input
                  ref={inputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={finishEditing}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border-b-2 border-indigo-400 focus:outline-none px-1"
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => startEditing(item.id, item.text)}
                  className="flex-1 cursor-text text-gray-700"
                >
                  {item.text}
                </span>
              )}
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((i) => i.id !== item.id))
                }
                className="ml-3 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InlineEditableInput;
