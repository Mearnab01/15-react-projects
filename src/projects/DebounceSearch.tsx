import { useState, useEffect } from "react";

const DebounceSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce API call
  useEffect(() => {
    if (!query) {
      setResults([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${query}`
        );
        const data = await res.json();

        if (data[0]?.Status === "Success") {
          setResults(data[0].PostOffice);
        } else {
          setResults([]);
          setError("No results found");
        }
      } catch {
        setResults([]);
        setError("Failed to fetch data");
      }
      setLoading(false);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Pincode Search
        </h1>

        <input
          type="text"
          placeholder="Enter Pincode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading && <p className="text-gray-500 mb-2">Loading...</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((office) => (
            <li
              key={office.Pincode + office.Name}
              className="p-2 bg-gray-50 rounded-md border border-gray-200"
            >
              <p className="font-medium">{office.Name}</p>
              <p className="text-sm text-gray-600">
                {office.District}, {office.State}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebounceSearch;
