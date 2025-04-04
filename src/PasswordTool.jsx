import React, { useState } from "react";
import "./index.css";

export default function PasswordTool() {
  const [mode, setMode] = useState("generate");
  const [strength, setStrength] = useState("strong");
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [strengthResult, setStrengthResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (strength === "weak") chars = "abcdefghijklmnopqrstuvwxyz";
    else if (strength === "medium") chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    else chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?";

    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const checkStrength = () => {
    const length = inputPassword.length;
    if (length < 6) setStrengthResult("Weak");
    else if (length < 10) setStrengthResult("Medium");
    else setStrengthResult("Strong");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">🔐 Password Generator & Strength Checker</h1>
      <div className="space-x-4 mb-4">
        <label><input type="radio" checked={mode === "generate"} onChange={() => setMode("generate")} /> Generate Password</label>
        <label><input type="radio" checked={mode === "check"} onChange={() => setMode("check")} /> Check Password Strength</label>
      </div>
      {mode === "generate" ? (
        <>
          <p className="text-yellow-400 mb-2">Select Password Strength</p>
          <div className="space-x-4 mb-4">
            <label><input type="radio" checked={strength === "weak"} onChange={() => setStrength("weak")} /> Weak</label>
            <label><input type="radio" checked={strength === "medium"} onChange={() => setStrength("medium")} /> Medium</label>
            <label><input type="radio" checked={strength === "strong"} onChange={() => setStrength("strong")} /> Strong</label>
          </div>
          <button className="bg-blue-500 px-6 py-2 rounded text-white" onClick={generatePassword}>Generate Password</button>
          {password && (
            <div className="mt-4">
              <span className="mr-2">{password}</span>
              <button onClick={copyToClipboard} className="bg-gray-300 px-2 py-1 text-blue-800 rounded">{copied ? "✅ Copied!" : "Copy"}</button>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-yellow-400 mb-2">Enter Your Password</p>
          <input type="text" className="p-2 rounded bg-gray-800 text-white" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
          <br />
          <button className="mt-4 bg-green-300 text-black px-6 py-2 rounded" onClick={checkStrength}>Check Strength</button>
          {strengthResult && (
            <p className="mt-2 text-lg">Strength: <span className="font-bold">{strengthResult}</span></p>
          )}
        </>
      )}
      <p className="mt-10 text-sm text-gray-400">© 2025 <strong>Manoughts TechPlanet</strong>. All rights reserved.</p>
    </div>
  );
}