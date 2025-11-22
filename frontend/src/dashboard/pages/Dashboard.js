// src/dashboard/pages/Dashboard.js
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import { Routes, Route, useNavigate } from "react-router-dom";

import Overview from "./Overview";
import Portfolio from "./Portfolio";
import VirtualMoney from "./VirtualMoney";
import RiskProfiler from "./RiskProfiler";
import AIPredictor from "./AIPredictor";
import Courses from "./Courses";
import VirtualWallet from "./VirtualWallet";

// Routes ke andar:
<Route path="virtual-wallet" element={<VirtualWallet />} />


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Simple auth check
    const token = localStorage.getItem("token");
    if (!token) {
      // Agar token nahi hai → login page pe bhej do
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b1a",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔹 Topbar full width */}
      <Topbar />

      {/* 🔹 Main content – no sidebar, no left gap */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="portfolio" element={<Portfolio />} />
          {/* Topbar me "Virtual Money" /wallet path hai, isliye yaha bhi wallet */}
          <Route path="wallet" element={<VirtualMoney />} />
          {/* Topbar me "AI Predictor" ka path /dashboard/ai hai */}
          <Route path="ai" element={<AIPredictor />} />
          {/* Topbar me "Risk Profiler" ka path /dashboard/risk hai */}
          <Route path="risk" element={<RiskProfiler />} />
          <Route path="courses" element={<Courses />} />
          <Route path="virtual-wallet" element={<VirtualWallet />} />

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
