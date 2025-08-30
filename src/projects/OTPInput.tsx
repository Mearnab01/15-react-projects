import { useState, useRef } from "react";

const OTPFeature = () => {
  const OTP_LENGTH = 6;
  const [generatedOTP, setGeneratedOTP] = useState(generateOTP(OTP_LENGTH));
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Generate random numeric OTP
  function generateOTP(length: number) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const verifyOTP = () => {
    const entered = otp.join("");
    if (entered === generatedOTP) {
      alert("✅ OTP Verified Successfully!");
      setOtp(Array(OTP_LENGTH).fill(""));
      setGeneratedOTP(generateOTP(OTP_LENGTH));
    } else {
      alert("❌ Wrong OTP! Try again.");
    }
  };

  // Regenerate OTP
  const regenerateOTP = () => {
    const newOtp = generateOTP(OTP_LENGTH);
    setGeneratedOTP(newOtp);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    alert("🔄 New OTP Generated: " + newOtp);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">OTP Verification</h1>
        <p className="text-gray-600">
          Generated OTP: <span className="font-mono">{generatedOTP}</span>
        </p>

        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            />
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={verifyOTP}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Verify
          </button>
          <button
            onClick={regenerateOTP}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPFeature;
