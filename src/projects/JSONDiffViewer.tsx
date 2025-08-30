import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image?: string;
}

const JSONDiffViewer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [diffs, setDiffs] = useState<
    { path: string; oldValue: any; newValue: any }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setOriginalUsers(JSON.parse(JSON.stringify(data.users)));
      })
      .catch((err) => console.log("Error fetching users:", err));
  }, []);

  const findDifferences = (
    obj1: any,
    obj2: any,
    path = ""
  ): { path: string; oldValue: any; newValue: any }[] => {
    if (obj1 === obj2) return [];
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      !obj1 ||
      !obj2
    ) {
      return [{ path, oldValue: obj1, newValue: obj2 }];
    }

    return Array.from(
      new Set([...Object.keys(obj1), ...Object.keys(obj2)])
    ).flatMap((key) => {
      const newPath = path ? `${path}.${key}` : key;
      return findDifferences(obj1[key], obj2[key], newPath);
    });
  };

  const updateUserField = (id: number, field: keyof User, value: any) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
    if (selectedUser?.id === id)
      setSelectedUser({ ...selectedUser, [field]: value });
  };

  useEffect(() => {
    if (!originalUsers.length) return;
    const allDiffs = users.flatMap((user, idx) =>
      findDifferences(originalUsers[idx], user, `users[${idx}]`)
    );
    setDiffs(allDiffs);
  }, [users, originalUsers]);

  const resetChanges = () => {
    setUsers(JSON.parse(JSON.stringify(originalUsers)));
    setSelectedUser(null);
  };

  const saveChanges = () => {
    setOriginalUsers(JSON.parse(JSON.stringify(users)));
    setDiffs([]);
    alert("Changes saved!");
  };

  const renderInput = (label: string, field: keyof User, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={selectedUser![field] as any}
        onChange={(e) =>
          updateUserField(
            selectedUser!.id,
            field,
            type === "number" ? +e.target.value : e.target.value
          )
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          JSON Diff Viewer
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={resetChanges}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Reset Changes
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
        </div>

        {diffs.length > 0 && (
          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Changes ({diffs.length})
            </h3>
            <div className="max-h-64 overflow-y-auto">
              {diffs.map((diff, i) => (
                <div key={i} className="bg-white p-3 rounded-md mb-2 shadow-sm">
                  <strong>{diff.path}:</strong>{" "}
                  <span className="text-red-500 line-through">
                    {JSON.stringify(diff.oldValue)}
                  </span>{" "}
                  →{" "}
                  <span className="text-green-600">
                    {JSON.stringify(diff.newValue)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-screen overflow-y-auto pr-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedUser?.id === u.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedUser(u)}
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={u.image || `https://i.pravatar.cc/40?u=${u.id}`}
                      alt={`${u.firstName} ${u.lastName}`}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {u.firstName} {u.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {u.id}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Age: {u.age}</p>
                    <p className="truncate">Email: {u.email}</p>
                    <p>Phone: {u.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? "Edit User" : "Select a User"}
            </h2>
            {selectedUser ? (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {renderInput("First Name", "firstName")}
                {renderInput("Last Name", "lastName")}
                {renderInput("Age", "age", "number")}
                {renderInput("Email", "email", "email")}
                {renderInput("Phone", "phone")}
              </div>
            ) : (
              <p className="text-gray-500">
                Select a user card to edit their information
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Current JSON Data</h2>
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-hidden">
            <pre className="overflow-auto max-h-80">
              {JSON.stringify(users, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONDiffViewer;
