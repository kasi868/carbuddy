import React, { useState } from "react";
import { useForgotPasswordMutation } from "../services/authApi"; // <-- RTK endpoint

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      setMessage(res.message || "Check your email for reset link!");
    } catch (err) {
      setMessage(err?.data?.error || "Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
