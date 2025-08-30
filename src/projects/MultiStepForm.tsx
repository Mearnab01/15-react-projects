import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  age: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
};

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation per step
  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1 && !form.name.trim()) newErrors.name = "Name is required";
    if (step === 2) {
      if (!form.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Email is invalid";

      if (!form.password) newErrors.password = "Password required";
      else if (form.password.length < 6)
        newErrors.password = "Password too short";
    }
    if (step === 3 && !form.age) newErrors.age = "Age is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      alert("✅ Form submitted successfully!");
      setForm({ name: "", email: "", password: "", age: "" });
      setStep(1);
      setErrors({});
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Multi-Step Form
        </h1>

        {/* Step indicators */}
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === s
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step content */}
        {step === 1 && (
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
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <>
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
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.age
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Previous
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-auto"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
