// src/App.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./dashboard/pages/Dashboard";
import PricingPage from "./landing_page/PricingPage";
import ProductPage from "./landing_page/ProductPage";
import SupportPage from "./landing_page/SupportPage";



import "./index.css";

// ⭐ NEW — just 1 import
import AboutPage from "./landing_page/AboutPage";

function App() {
  const navigate = useNavigate();

  // ✅ yahi missing tha – ab dono jaga use kar sakte ho
  const handleOpenAccount = () => {
    navigate("/register");
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <LandingPage
            onOpenAccount={handleOpenAccount}
          />
        }
      />

      {/* Pricing Page (separate route) */}
      <Route
        path="/pricing"
        element={<PricingPage onOpenAccount={handleOpenAccount} />}
      />

      <Route
  path="/product"
  element={<ProductPage onOpenAccount={handleOpenAccount} />}
/>

<Route
  path="/support"
  element={<SupportPage onOpenAccount={handleOpenAccount} />}
/>



      {/* ⭐ NEW — just 1 new line */}
      <Route path="/about" element={<AboutPage />} />

      {/* Register Page */}
      <Route
        path="/register"
        element={
          <Register
            onLoginClick={() => {
              navigate("/login");
            }}
          />
        }
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Login
            onRegisterClick={() => {
              navigate("/register");
            }}
            onLoginSuccess={() => {
              navigate("/dashboard/overview");
            }}
          />
        }
      />

      {/* Dashboard + nested routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
