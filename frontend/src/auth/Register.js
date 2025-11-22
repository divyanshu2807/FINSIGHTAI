// src/auth/Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = ({ onLoginClick }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // 🧾 Basic frontend validation
    if (
      !form.fullname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all the fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // ✅ BACKEND KA ACTUAL ROUTE
    const REGISTER_URL = "https://finsightai-1.onrender.com/api/users/register";

    // ✅ Backend ko jo data chahiye (common pattern: name, email, password)
    const requestBody = {
      name: form.fullname,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await axios.post(REGISTER_URL, requestBody);
      console.log("REGISTER SUCCESS:", res.data);

      setSuccessMsg("Account created successfully! Redirecting to login…");
      setError("");

      // thoda delay deke login page pe bhej denge
      setTimeout(() => {
        if (onLoginClick) onLoginClick();
      }, 600);
    } catch (err) {
      console.log("REGISTER ERROR:", err?.response?.data || err.message);

      const data = err?.response?.data;

      const backendMessage =
        data?.message ||
        data?.error ||
        data?.msg ||
        (Array.isArray(data?.errors) && data.errors[0]?.msg);

      setError(backendMessage || "Registration failed. Please try again.");
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
          Create your FinsightAI account
        </h1>

        <p style={{ color: "#b8c6d9", marginBottom: "30px" }}>
          Start your AI-powered investing journey — it’s quick and secure.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label
            style={{
              display: "block",
              fontSize: "15px",
              marginBottom: "6px",
              marginTop: "20px",
              color: "#bad7ff",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            onChange={handleChange}
            value={form.fullname}
            placeholder="Enter your full name"
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
            onChange={handleChange}
            value={form.email}
            placeholder="you@example.com"
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

          {/* Password Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
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
                onChange={handleChange}
                value={form.password}
                placeholder="Minimum 6 characters"
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
            </div>

            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "15px",
                  marginBottom: "6px",
                  marginTop: "20px",
                  color: "#bad7ff",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                placeholder="Re-type password"
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
            </div>
          </div>

          {/* Error / Success */}
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

          {successMsg && (
            <p
              style={{
                marginTop: "16px",
                color: "#7bff9f",
                fontSize: "14px",
              }}
            >
              {successMsg}
            </p>
          )}

          <p style={{ margin: "15px 0", color: "#b8c6d9", fontSize: "14px" }}>
            By creating an account, you agree to our{" "}
            <span style={{ color: "#5c9fff", cursor: "pointer" }}>Terms</span>.
          </p>

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
              marginTop: "10px",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={{ marginTop: "22px", color: "#b8c6d9" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#5c9fff", cursor: "pointer" }}
              onClick={onLoginClick}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
