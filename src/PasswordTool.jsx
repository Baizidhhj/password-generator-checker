import React, { useState } from "react";

export default function PasswordTool() {
  const [mode, setMode] = useState("generate");
  const [strength, setStrength] = useState("strong");
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [strengthResult, setStrengthResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (strength === "weak") {
      chars = "abcdefghijklmnopqrstuvwxyz";
    } else if (strength === "medium") {
      chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else {
      chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    }

    let pwd = "";
    for (let i = 0; i < 10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(pwd);
    setCopied(false);
  };

  const checkStrength = () => {
    const length = inputPassword.length;
    if (length === 0) {
      setStrengthResult("");
    } else if (length < 6) {
      setStrengthResult("Weak");
    } else if (length < 10) {
      setStrengthResult("Medium");
    } else {
      setStrengthResult("Strong");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="border border-gray-600 rounded-xl p-6 w-full max-w-lg bg-[#111] shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-400">
          🔐 Password Generator & Strength Checker
        </h1>

        <div className="flex justify-center space-x-4 mb-6 text-sm">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="generate"
              checked={mode === "generate"}
              onChange={() => setMode("generate")}
              className="mr-1 accent-red-500"
            />
            <span className="text-pink-400 hover:border-t-2 border-red-500">
              Generate Password
            </span>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="check"
              checked={mode === "check"}
              onChange={() => setMode("check")}
              className="mr-1 accent-purple-500"
            />
            <span className="text-purple-400 hover:border-t-2 border-red-500">
              Check Password Strength
            </span>
          </label>
        </div>

        {mode === "generate" && (
          <>
            <label className="block mb-2 text-yellow-400">
              Select Password Strength
            </label>
            <div className="flex space-x-6 mb-4 text-sm">
              {["weak", "medium", "strong"].map((level) => (
                <label key={level} className="cursor-pointer hover:border-t-2 border-red-500">
                  <input
                    type="radio"
                    name="strength"
                    value={level}
                    checked={strength === level}
                    onChange={() => setStrength(level)}
                    className="mr-1 accent-red-600"
                  />
                  <span
                    className={
                      level === "weak"
                        ? "text-red-400"
                        : level === "medium"
                        ? "text-orange-300"
                        : "text-green-400"
                    }
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={generatePassword}
              className="w-full py-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded-md mb-4 transition-opacity duration-200"
            >
              Generate Password
            </button>

            {password && (
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-md">
                <span className="text-green-400">{password}</span>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 text-blue-400 hover:text-blue-300 transition"
                >
                  {copied ? "✅ Copied!" : "Copy"}
                </button>
              </div>
            )}
          </>
        )}

        {mode === "check" && (
          <>
            <label className="block mb-2 text-yellow-400">Enter Your Password</label>
            <input
              type="text"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 mb-4"
            />

            <button
              onClick={checkStrength}
              className="w-full py-2 bg-lime-400 hover:bg-lime-500 text-black rounded-md transition-opacity duration-200 opacity-70 hover:opacity-90"
            >
              Check Strength
            </button>

            {strengthResult && (
              <p className="mt-4 text-md font-medium">
                Strength:{" "}
                <span
                  className={
                    strengthResult === "Weak"
                      ? "text-red-400"
                      : strengthResult === "Medium"
                      ? "text-orange-300"
                      : "text-green-400"
                  }
                >
                  {strengthResult}
                </span>
              </p>
            )}
          </>
        )}
      </div>

      <footer className="mt-6 text-sm text-gray-400">
        © 2025 <span className="font-bold text-white">Manoughts TechPlanet.</span> All rights reserved.
      </footer>
    </div>
  );
}
