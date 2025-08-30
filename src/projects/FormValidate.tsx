import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormValidate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: 18,
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Live validation with debounce
  useEffect(() => {
    const timer = setTimeout(() => validate(), 300);
    return () => clearTimeout(timer);
  }, [form]);

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.match(/[A-Z]/) && pwd.match(/\d/) && pwd.length >= 8)
      return "Strong";
    return "Medium";
  };

  const validate = () => {
    const newErrors: typeof errors = { name: "", email: "", password: "" };

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 chars";

    setErrors(newErrors);
    setPasswordStrength(calculatePasswordStrength(form.password));

    return !newErrors.name && !newErrors.email && !newErrors.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, age: parseInt(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Form submitted successfully!");
      setForm({ name: "", email: "", password: "", age: 18 });
      setErrors({ name: "", email: "", password: "" });
      setPasswordStrength("");
    } else {
      alert("❌ Fix errors before submitting");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Form Validation
        </h1>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          {form.password && !errors.password && (
            <p className="text-sm mt-1">
              Password Strength:{" "}
              <span
                className={
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }
              >
                {passwordStrength}
              </span>
            </p>
          )}
        </div>

        {/* Age slider */}
        <div>
          <label className="block mb-1 font-medium">Age ({form.age})</label>
          <input
            type="range"
            min="10"
            max="100"
            value={form.age}
            onChange={handleAgeChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidate;
