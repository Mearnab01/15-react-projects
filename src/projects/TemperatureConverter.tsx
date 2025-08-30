import { useState } from "react";

const API_KEY = "30a76f99c405266eb7008e97dc750523";

const TemperatureConverter = () => {
  const [city, setCity] = useState("");
  const [tempC, setTempC] = useState<number | null>(null);
  const [tempF, setTempF] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  // Fetch temp in Celsius from API
  const fetchTemperature = async () => {
    if (!city) {
      setError("Please enter a city");
      setTempC(null);
      setTempF(null);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setLoading(false);

      if (data.main?.temp !== undefined) {
        const c = data.main.temp;
        setTempC(parseFloat(c.toFixed(2)));
        setTempF(parseFloat(((c * 9) / 5 + 32).toFixed(2)));
      } else {
        setError("No temperature found for this city");
        setTempC(null);
        setTempF(null);
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch temperature");
      setTempC(null);
      setTempF(null);
    }
  };

  // Manual Celsius input
  const handleCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      setTempC(num);
      setTempF(parseFloat(((num * 9) / 5 + 32).toFixed(2)));
    } else {
      setTempC(null);
      setTempF(null);
    }
  };

  // Manual Fahrenheit input
  const handleFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      setTempF(num);
      setTempC(parseFloat((((num - 32) * 5) / 9).toFixed(2)));
    } else {
      setTempC(null);
      setTempF(null);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Temperature Converter
        </h1>

        {/* City Input */}
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchTemperature}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
        >
          {loading ? "Loading..." : "Get Temperature"}
        </button>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Manual Conversion */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Celsius (°C)</label>
            <input
              type="number"
              value={tempC ?? ""}
              onChange={handleCChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fahrenheit (°F)</label>
            <input
              type="number"
              value={tempF ?? ""}
              onChange={handleFChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
