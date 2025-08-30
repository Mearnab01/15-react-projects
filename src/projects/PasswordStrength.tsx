import { useState, useEffect } from "react";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const calculateStrength = (pwd: string) => {
    if (!pwd) return "";
    let score = 0;

    // Check length
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;

    // Check character types
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    // Determine strength
    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Weak":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Strong":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Password Strength Checker
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {password && (
          <p className={`font-semibold ${getStrengthColor(strength)}`}>
            Strength: {strength}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
