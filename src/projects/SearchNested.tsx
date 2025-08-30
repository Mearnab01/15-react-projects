import { useState } from "react";

type NestedItem = {
  id: number;
  name: string;
  children?: NestedItem[];
};

// Sample nested data
const nestedData: NestedItem[] = [
  {
    id: 1,
    name: "Fruits",
    children: [
      { id: 11, name: "Apple" },
      { id: 12, name: "Banana" },
      {
        id: 13,
        name: "Citrus",
        children: [
          { id: 131, name: "Orange" },
          { id: 132, name: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Vegetables",
    children: [
      { id: 21, name: "Carrot" },
      { id: 22, name: "Broccoli" },
    ],
  },
];

// Recursive search function
const searchNested = (items: NestedItem[], query: string): NestedItem[] => {
  const result: NestedItem[] = [];

  for (const item of items) {
    const matches = item.name.toLowerCase().includes(query.toLowerCase());
    const children = item.children ? searchNested(item.children, query) : [];

    if (matches || children.length > 0) {
      result.push({
        ...item,
        children: children.length > 0 ? children : undefined,
      });
    }
  }

  return result;
};

const SearchNested = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NestedItem[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) setResults([]);
    else setResults(searchNested(nestedData, value));
  };

  const renderItems = (items: NestedItem[]) => (
    <ul className="pl-4 list-disc">
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          {item.children && renderItems(item.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Search Nested Structure
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {results.length === 0 && query && (
          <p className="text-red-500 text-center">No results found</p>
        )}

        {results.length > 0 && <div>{renderItems(results)}</div>}
      </div>
    </div>
  );
};

export default SearchNested;
