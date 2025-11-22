// src/auth/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({ onRegisterClick, onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    // ✅ Possible login URLs – jo sahi hoga, wahi success dega
const LOGIN_URLS = [
  "https://finsightai-1.onrender.com/api/auth/login",
  "https://finsightai-1.onrender.com/api/users/login",
  "https://finsightai-1.onrender.com/api/login",
];

    const requestBody = {
      email: form.email,
      password: form.password,
    };

    let lastError = null;

    try {
      for (const url of LOGIN_URLS) {
        try {
          const res = await axios.post(url, requestBody);
          console.log("LOGIN SUCCESS via:", url, res.data);

          // 🔐 token alag-alag naam se aa sakta hai – sab check kar rahe
          const data = res.data;
          let token =
            data.token ||
            data.accessToken ||
            data.jwt ||
            (data.data && (data.data.token || data.data.accessToken));

          // agar backend token nahi bhej raha but login success ho gaya
          if (!token) {
            console.warn(
              "No token field found in response, using demo-token for frontend guard."
            );
            token = "demo-token";
          }

          localStorage.setItem("token", token);

          if (onLoginSuccess) onLoginSuccess(); // -> /dashboard/overview
          return; // success ho gaya, loop se nikal jao
        } catch (err) {
          lastError = err;
          console.log("Login failed at:", url, err?.response?.data || err.message);
        }
      }

      // agar sab URL fail ho gaye
      if (lastError) {
        const data = lastError?.response?.data;
        const backendMessage =
          data?.message ||
          data?.error ||
          data?.msg ||
          (Array.isArray(data?.errors) && data.errors[0]?.msg);

        setError(
          backendMessage || "Invalid email or password. Please try again."
        );
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #00203f, #021526)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          width: "750px",
          background: "rgba(0, 0, 0, 0.25)",
          padding: "40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.4)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "5px" }}>
          Login to your FinsightAI account
        </h1>

        <p style={{ color: "#b8c6d9", marginBottom: "30px" }}>
          Welcome back! Continue your AI-powered investing journey.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label
            style={{
              display: "block",
              fontSize: "15px",
              marginBottom: "6px",
              marginTop: "20px",
              color: "#bad7ff",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              outline: "none",
              color: "white",
            }}
          />

          {/* Password */}
          <label
            style={{
              display: "block",
              fontSize: "15px",
              marginBottom: "6px",
              marginTop: "20px",
              color: "#bad7ff",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              outline: "none",
              color: "white",
            }}
          />

          {/* Error */}
          {error && (
            <p
              style={{
                marginTop: "16px",
                color: "#ff7b7b",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "140px",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              background: "linear-gradient(90deg, #2d7dff, #8b63ff)",
              border: "none",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "20px",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ marginTop: "22px", color: "#b8c6d9" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#5c9fff", cursor: "pointer" }}
              onClick={onRegisterClick}
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
