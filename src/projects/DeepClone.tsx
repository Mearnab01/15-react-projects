import { useState } from "react";

const DeepClone = () => {
  const [input, setInput] = useState<string>(
    '{"name":"Arnab","age":22,"address":{"city":"Kolkata"}}'
  );
  const [original, setOriginal] = useState<any>(null);
  const [cloned, setCloned] = useState<any>(null);

  const handleClone = () => {
    try {
      const obj = JSON.parse(input);
      setOriginal(obj);

      // Deep clone
      const deepCopy = JSON.parse(JSON.stringify(obj));
      // Example modification to show cloning
      if (deepCopy.name) deepCopy.name += " (cloned)";
      setCloned(deepCopy);
    } catch (err) {
      alert("Invalid JSON input!");
      setOriginal(null);
      setCloned(null);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Deep Clone Utility</h1>

      <textarea
        className="w-full max-w-md p-2 mb-4 rounded-md focus:outline-none"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleClone}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mb-6"
      >
        Deep Clone
      </button>

      {(original || cloned) && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {original && (
            <div className="bg-white p-4 rounded-md">
              <h2 className="font-semibold mb-2">Original Object</h2>
              <pre className="text-sm">{JSON.stringify(original, null, 2)}</pre>
            </div>
          )}
          {cloned && (
            <div className="bg-white p-4 rounded-md">
              <h2 className="font-semibold mb-2">Cloned Object</h2>
              <pre className="text-sm">{JSON.stringify(cloned, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeepClone;
