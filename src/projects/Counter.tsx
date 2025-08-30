import { useState } from "react";

const MAX_COUNT = 10;

const Counter = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCount = (newCount: number) => {
    // Keep only the last MAX_COUNT entries
    const newHistory = [...history.slice(0, currentIndex + 1), newCount].slice(
      -MAX_COUNT
    );
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setCount(newCount);
  };

  const increment = () => updateCount(count + 1);
  const decrement = () => updateCount(count - 1);
  const reset = () => updateCount(0);

  const undo = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCount(history[prevIndex]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCount(history[nextIndex]);
    }
  };

  const undoLeft = currentIndex; // how many undos left
  const redoLeft = history.length - 1 - currentIndex; // how many redos left

  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-purple-900 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Counter</h1>

        <div className="text-6xl font-bold text-blue-600 mb-4">{count}</div>
        <p className="text-sm text-gray-600 mb-8">
          Undo left: {undoLeft} | Redo left: {redoLeft}
        </p>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
          >
            -
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
          >
            +
          </button>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={undo}
            disabled={undoLeft === 0}
            className={`px-6 py-3 rounded-lg font-semibold text-lg ${
              undoLeft > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Undo
          </button>
          <button
            onClick={redo}
            disabled={redoLeft === 0}
            className={`px-6 py-3 rounded-lg font-semibold text-lg ${
              redoLeft > 0
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
