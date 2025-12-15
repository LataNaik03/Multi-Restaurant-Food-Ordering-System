import React, { useState } from "react";
import api from "../api/api";
import "./LoginRegister.css";

export default function LoginRegister({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, form);

      if (isLogin) {
        // ✅ LOGIN SUCCESS — Store user info in localStorage
        const userData = res.data;

        if (!userData.id) {
          console.warn("⚠️ No user ID found in API response:", userData);
        }

        localStorage.setItem("user", JSON.stringify(userData));
        setMessage("✅ Login successful!");
        if (onLogin) onLogin(userData);

        // Optional short delay before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        // ✅ REGISTRATION SUCCESS — Switch to login
        setMessage("🎉 Registration successful! Redirecting to login...");
        setTimeout(() => {
          setIsLogin(true);
          setMessage("");
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Login/Register error:", error.response?.data || error.message);
      setMessage("❌ " + (error.response?.data || "Something went wrong. Try again!"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🧑‍🍳"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text" onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
