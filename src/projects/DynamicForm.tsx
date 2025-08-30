import { useState } from "react";
import { X, Plus } from "lucide-react";

type Field = {
  id: number;
  label: string;
  type: "text" | "number" | "email";
  value: string;
};

const DynamicForm = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, label: "Name", type: "text", value: "" },
  ]);

  const handleChange = (id: number, value: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  const addField = () => {
    const newId = fields.length ? fields[fields.length - 1].id + 1 : 1;
    setFields([
      ...fields,
      { id: newId, label: "New Field", type: "text", value: "" },
    ]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form Data:\n" + JSON.stringify(fields, null, 2));
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Dynamic Form
        </h1>

        {fields.map((field) => (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.label}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="flex items-center justify-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          <Plus size={16} />
          <span>Add Field</span>
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
