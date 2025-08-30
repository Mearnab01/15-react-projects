import { useState } from "react";

type Item = {
  id: number;
  category: string;
  name: string;
};

const sampleData: Item[] = [
  { id: 1, category: "Fruit", name: "Apple" },
  { id: 2, category: "Fruit", name: "Banana" },
  { id: 3, category: "Vegetable", name: "Carrot" },
  { id: 4, category: "VegeTable", name: "Broccoli" },
];

// Case-insensitive groupBy
const groupBy = <T, K extends keyof T>(array: T[], key: K) => {
  return array.reduce((result, currentItem) => {
    const groupKey = (currentItem[key] as unknown as string).toLowerCase();
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(currentItem);
    return result;
  }, {} as Record<string, T[]>);
};

const GroupByUtility = () => {
  const [items, setItems] = useState<Item[]>(sampleData);
  const [grouped, setGrouped] = useState<Record<string, Item[]>>({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleAddItem = () => {
    if (!name.trim() || !category.trim()) return;
    const newItem: Item = { id: items.length + 1, name, category };
    setItems([...items, newItem]);
    setName("");
    setCategory("");
  };

  const handleGroupByCategory = () => {
    const result = groupBy(items, "category");
    setGrouped(result);
  };

  const handleClear = () => {
    setGrouped({});
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Left panel: Inputs */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mr-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Add Items
        </h1>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddItem}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md mb-2"
        >
          Add Item
        </button>
        <button
          onClick={handleGroupByCategory}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mb-2"
        >
          Group by Category
        </button>
        <button
          onClick={handleClear}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
        >
          Clear All
        </button>
      </div>

      {/* Right panel: Grouped results */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl grid grid-cols-2 gap-6">
        {Object.keys(grouped).length === 0 ? (
          <p className="col-span-2 text-center text-gray-500">
            Grouped items will appear here
          </p>
        ) : (
          Object.entries(grouped).map(([key, groupItems]) => (
            <div key={key} className="border p-3 rounded-md">
              <h2 className="font-semibold text-lg capitalize">{key}</h2>
              <ul className="pl-4 list-disc mt-1">
                {groupItems.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupByUtility;
