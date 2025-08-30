import { useState } from "react";

// Polyfill for Promise.all
function promiseAll<T>(promises: (Promise<T> | T)[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

// Fake API call function
const fakeApiCall = (id: number, delay: number) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) resolve(`Result ${id}`); // 90% success
      else reject(`Error ${id}`);
    }, delay);
  });

const PromiseAllPolyfill = () => {
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runPolyfill = async () => {
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const data = await promiseAll([
        fakeApiCall(1, 1000),
        fakeApiCall(2, 1500),
        fakeApiCall(3, 800),
      ]);
      setResults(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Promise.all Polyfill Demo
        </h1>

        <button
          onClick={runPolyfill}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md mb-4"
        >
          Run Polyfill
        </button>

        {loading && <p className="text-gray-600">Loading...</p>}

        {error && <p className="text-red-500">Error: {error}</p>}

        {results.length > 0 && (
          <ul className="mt-4 space-y-2">
            {results.map((res, idx) => (
              <li key={idx} className="text-green-600 font-medium">
                {res}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PromiseAllPolyfill;
